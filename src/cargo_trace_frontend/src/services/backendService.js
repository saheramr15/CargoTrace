
import { Actor, HttpAgent } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';


class BackendService {
    constructor() {
        this.agent = null;
        this.actor = null;
        this.isInitialized = false;
        this.canisterId = null;
    }

    // Initialize the service with Internet Identity
    async initialize(identity) {
        try {
            // Create HTTP agent
            this.agent = new HttpAgent({
                identity: identity,
                host: process.env.DFX_NETWORK === 'ic' 
                    ? 'https://ic0.app' 
                    : 'http://127.0.0.1:4943'
            });

            // Get canister ID from environment or use default for local development
            this.canisterId = process.env.CANISTER_ID_CARGO_TRACE_BACKEND || 
                             process.env.VITE_CANISTER_ID_CARGO_TRACE_BACKEND ||
                             'rrkah-fqaaa-aaaaa-aaaaq-cai'; // Default local canister ID

            // For development, we'll use a mock implementation until dfx generate is run
            // Uncomment the following lines after running dfx generate:
            // this.actor = Actor.createActor(idlFactory, {
            //     agent: this.agent,
            //     canisterId: this.canisterId
            // });

            // For now, we'll use a mock implementation that simulates the real backend
            this.actor = this.createMockActor();
            
            this.isInitialized = true;
            console.log('✅ Backend service initialized with canister ID:', this.canisterId);
            
        } catch (error) {
            console.error('❌ Failed to initialize backend service:', error);
            throw error;
        }
    }


       // 👉 ADD HERE: restore service state on refresh
    async tryRestore() {
        const initialized = localStorage.getItem("backend_initialized");
        if (initialized === "true") {
            this.actor = this.createMockActor();
            this.isInitialized = true;
            console.log("🔄 Backend service restored from localStorage");

            // (Optional) restore mock documents if you add persistence
            const savedDocs = localStorage.getItem("mock_documents");
            if (savedDocs) {
                this.actor._loadDocuments(JSON.parse(savedDocs));
            }
        }
    }


    // Mock actor that simulates the real ICP backend behavior
    createMockActor() {
        // In-memory storage for mock data
        const mockData = {
            documents: new Map(),
            loans: new Map(),
            acidValidations: new Map(),
            balances: new Map(),
            counters: { document: 0, loan: 0 }
        };

        return {
            // ACID Validation
            validate_acid: async (acidNumber) => {
                console.log('🔍 Validating ACID:', acidNumber);
                
                // Basic validation
                if (acidNumber.length !== 9 || !/^\d+$/.test(acidNumber)) {
                    return { Err: "Invalid ACID format. Must be 9 digits." };
                }

                // Check against static dataset (same as backend)
                const validAcids = ['123456789', '987654321', '456789123', '789123456', '321654987'];
                const isValid = validAcids.includes(acidNumber);
                
                // Store validation result
                mockData.acidValidations.set(acidNumber, {
                    acid_number: acidNumber,
                    is_valid: isValid,
                    customs_data: isValid ? "Simulated customs data" : null,
                    validation_date: Date.now()
                });
                
                return { Ok: isValid };
            },

            get_acid_validation: async (acidNumber) => {
                return mockData.acidValidations.get(acidNumber) || null;
            },

            // Document Management
            submit_document: async (acidNumber, ethereumTxHash, valueUsd) => {
                console.log('📄 Submitting document:', { acidNumber, ethereumTxHash, valueUsd });
                
                // Validate ACID first
                const validation = await this.actor.validate_acid(acidNumber);
                if (validation.Err) {
                    return validation;
                }
                if (!validation.Ok) {
                    return { Err: "Invalid ACID number." };
                }

                // Generate document ID
                mockData.counters.document++;
                const documentId = `DOC-${mockData.counters.document.toString().padStart(6, '0')}`;
                
                // Create document
                const document = {
                    id: documentId,
                    acid_number: acidNumber,
                    ethereum_tx_hash: ethereumTxHash,
                    value_usd: valueUsd,
                    status: { Pending: null },
                    created_at: Date.now(),
                    owner: '2vxsx-fae' // Mock principal
                };
                
                mockData.documents.set(documentId, document);
                
                return { Ok: documentId };
            },

            get_document: async (documentId) => {
                return mockData.documents.get(documentId) || null;
            },

            get_my_documents: async () => {
                // Return all documents (in real implementation, filter by owner)
                return Array.from(mockData.documents.values());
            },

            approve_document: async (documentId) => {
                console.log('✅ Approving document:', documentId);
                
                const document = mockData.documents.get(documentId);
                if (!document) {
                    return { Err: "Document not found." };
                }
                
                document.status = { NftMinted: null };
                mockData.documents.set(documentId, document);
                
                return { Ok: null };
            },

            // Loan Management
            request_loan: async (documentId, amount, repaymentDate) => {
                console.log('💰 Requesting loan:', { documentId, amount, repaymentDate });
                
                const document = mockData.documents.get(documentId);
                if (!document) {
                    return { Err: "Document not found." };
                }
                
                if (document.status.NftMinted === undefined) {
                    return { Err: "Document must be approved and NFT minted before requesting loan." };
                }
                
                if (amount > document.value_usd * 80 / 100) {
                    return { Err: "Loan amount cannot exceed 80% of document value." };
                }
                
                mockData.counters.loan++;
                const loanId = `LOAN-${mockData.counters.loan.toString().padStart(6, '0')}`;
                
                const loan = {
                    id: loanId,
                    document_id: documentId,
                    amount: amount,
                    interest_rate: 4.5,
                    status: { Pending: null },
                    created_at: Date.now(),
                    borrower: '2vxsx-fae', // Mock principal
                    repayment_date: repaymentDate
                };
                
                mockData.loans.set(loanId, loan);
                
                return { Ok: loanId };
            },

            get_loan: async (loanId) => {
                return mockData.loans.get(loanId) || null;
            },

            get_my_loans: async () => {
                // Return all loans (in real implementation, filter by borrower)
                return Array.from(mockData.loans.values());
            },

            approve_loan: async (loanId) => {
                console.log('✅ Approving loan:', loanId);
                
                const loan = mockData.loans.get(loanId);
                if (!loan) {
                    return { Err: "Loan not found." };
                }
                
                loan.status = { Approved: null };
                mockData.loans.set(loanId, loan);
                
                // Add balance to borrower
                const currentBalance = mockData.balances.get(loan.borrower) || 0;
                mockData.balances.set(loan.borrower, currentBalance + loan.amount);
                
                return { Ok: null };
            },

            repay_loan: async (loanId, amount) => {
                console.log('💳 Repaying loan:', { loanId, amount });
                
                const loan = mockData.loans.get(loanId);
                if (!loan) {
                    return { Err: "Loan not found." };
                }
                
                const currentBalance = mockData.balances.get(loan.borrower) || 0;
                if (currentBalance < amount) {
                    return { Err: "Insufficient balance for repayment." };
                }
                
                // Deduct from balance
                mockData.balances.set(loan.borrower, currentBalance - amount);
                
                // Update loan status if fully repaid
                if (amount >= loan.amount) {
                    loan.status = { Repaid: null };
                    mockData.loans.set(loanId, loan);
                }
                
                return { Ok: null };
            },

            // Token Management
            get_balance: async () => {
                return mockData.balances.get('2vxsx-fae') || 0;
            },

            mint: async (amount) => {
                console.log('🪙 Minting tokens:', amount);
                
                const currentBalance = mockData.balances.get('2vxsx-fae') || 0;
                mockData.balances.set('2vxsx-fae', currentBalance + amount);
                
                return { Ok: null };
            },

            transfer: async (to, amount) => {
                console.log('💸 Transferring tokens:', { to, amount });
                
                const currentBalance = mockData.balances.get('2vxsx-fae') || 0;
                if (currentBalance < amount) {
                    return { Err: "Insufficient balance." };
                }
                
                // Deduct from sender
                mockData.balances.set('2vxsx-fae', currentBalance - amount);
                
                // Add to recipient
                const recipientBalance = mockData.balances.get(to) || 0;
                mockData.balances.set(to, recipientBalance + amount);
                
                return { Ok: null };
            },

            // Transfer Management
            get_transfers: async () => {
                return []; // Mock empty transfers
            },

            ingest_transfer: async (transferPayload) => {
                console.log('📦 Ingesting transfer:', transferPayload);
                return { Ok: null };
            }
        };
    }

    // ACID Validation
    async validateAcid(acidNumber) {
        if (!this.isInitialized) {
            throw new Error('Backend service not initialized');
        }
        return await this.actor.validate_acid(acidNumber);
    }

    async getAcidValidation(acidNumber) {
        if (!this.isInitialized) {
            throw new Error('Backend service not initialized');
        }
        return await this.actor.get_acid_validation(acidNumber);
    }

    // Document Management
    async submitDocument(acidNumber, ethereumTxHash, valueUsd) {
        if (!this.isInitialized) {
            throw new Error('Backend service not initialized');
        }
        return await this.actor.submit_document(acidNumber, ethereumTxHash, valueUsd);
    }

    async getDocument(documentId) {
        if (!this.isInitialized) {
            throw new Error('Backend service not initialized');
        }
        return await this.actor.get_document(documentId);
    }

    async getMyDocuments() {
        if (!this.isInitialized) {
            throw new Error('Backend service not initialized');
        }
        return await this.actor.get_my_documents();
    }

    async approveDocument(documentId) {
        if (!this.isInitialized) {
            throw new Error('Backend service not initialized');
        }
        return await this.actor.approve_document(documentId);
    }

    // Loan Management
    async requestLoan(documentId, amount, repaymentDate) {
        if (!this.isInitialized) {
            throw new Error('Backend service not initialized');
        }
        return await this.actor.request_loan(documentId, amount, repaymentDate);
    }

    async getLoan(loanId) {
        if (!this.isInitialized) {
            throw new Error('Backend service not initialized');
        }
        return await this.actor.get_loan(loanId);
    }

    async getMyLoans() {
        if (!this.isInitialized) {
            throw new Error('Backend service not initialized');
        }
        return await this.actor.get_my_loans();
    }

    async approveLoan(loanId) {
        if (!this.isInitialized) {
            throw new Error('Backend service not initialized');
        }
        return await this.actor.approve_loan(loanId);
    }

    async repayLoan(loanId, amount) {
        if (!this.isInitialized) {
            throw new Error('Backend service not initialized');
        }
        return await this.actor.repay_loan(loanId, amount);
    }

    // Token Management
    async getBalance() {
        if (!this.isInitialized) {
            throw new Error('Backend service not initialized');
        }
        return await this.actor.get_balance();
    }

    async mintTokens(amount) {
        if (!this.isInitialized) {
            throw new Error('Backend service not initialized');
        }
        return await this.actor.mint(amount);
    }

    async transferTokens(to, amount) {
        if (!this.isInitialized) {
            throw new Error('Backend service not initialized');
        }
        return await this.actor.transfer(to, amount);
    }

    // Transfer Management
    async getTransfers() {
        if (!this.isInitialized) {
            throw new Error('Backend service not initialized');
        }
        return await this.actor.get_transfers();
    }

    async ingestTransfer(transferPayload) {
        if (!this.isInitialized) {
            throw new Error('Backend service not initialized');
        }
        return await this.actor.ingest_transfer(transferPayload);
    }

    // Utility methods
    getCanisterId() {
        return this.canisterId;
    }

    isReady() {
        return this.isInitialized && this.actor !== null;
    }
}

// Export singleton instance
export const backendService = new BackendService();
export default backendService;
