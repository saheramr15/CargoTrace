// Backend Service for CargoTrace Frontend
// This connects the React frontend to the ICP backend canister

import { Actor, HttpAgent } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';

// Import the generated candid interface
// This will be generated when you run dfx generate
// import { idlFactory } from '../../../declarations/cargo_trace_backend/cargo_trace_backend.did.js';

class BackendService {
    constructor() {
        this.agent = null;
        this.actor = null;
        this.isInitialized = false;
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

            // Get canister ID from environment
            const canisterId = process.env.CANISTER_ID_CARGO_TRACE_BACKEND;
            if (!canisterId) {
                throw new Error('Canister ID not found in environment variables');
            }

            // Create actor (this would use the generated idlFactory)
            // this.actor = Actor.createActor(idlFactory, {
            //     agent: this.agent,
            //     canisterId: canisterId
            // });

            // For now, we'll use a mock implementation
            this.actor = this.createMockActor();
            
            this.isInitialized = true;
            console.log('✅ Backend service initialized');
            
        } catch (error) {
            console.error('❌ Failed to initialize backend service:', error);
            throw error;
        }
    }

    // Mock actor for testing (remove this when using real ICP)
    createMockActor() {
        return {
            // ACID Validation
            validate_acid: async (acidNumber) => {
                console.log('🔍 Validating ACID:', acidNumber);
                
                // Basic validation
                if (acidNumber.length !== 9 || !/^\d+$/.test(acidNumber)) {
                    return { Err: "Invalid ACID format. Must be 9 digits." };
                }

                // Check against static dataset
                const validAcids = ['123456789', '987654321', '456789123', '789123456', '321654987'];
                const isValid = validAcids.includes(acidNumber);
                
                return { Ok: isValid };
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
                const documentId = `DOC-${Date.now().toString().slice(-6)}`;
                
                return { Ok: documentId };
            },

            get_my_documents: async () => {
                // Return mock documents
                return [
                    {
                        id: 'DOC-000001',
                        acid_number: '123456789',
                        ethereum_tx_hash: '0x1234567890abcdef1234567890abcdef12345678',
                        value_usd: 50000,
                        status: { NftMinted: null },
                        created_at: Date.now(),
                        owner: '2vxsx-fae'
                    },
                    {
                        id: 'DOC-000002',
                        acid_number: '987654321',
                        ethereum_tx_hash: '0xabcdef1234567890abcdef1234567890abcdef12',
                        value_usd: 75000,
                        status: { Pending: null },
                        created_at: Date.now() - 86400000,
                        owner: '2vxsx-fae'
                    }
                ];
            },

            approve_document: async (documentId) => {
                console.log('✅ Approving document:', documentId);
                return { Ok: null };
            },

            // Loan Management
            request_loan: async (documentId, amount, repaymentDate) => {
                console.log('💰 Requesting loan:', { documentId, amount, repaymentDate });
                
                const loanId = `LOAN-${Date.now().toString().slice(-6)}`;
                return { Ok: loanId };
            },

            get_my_loans: async () => {
                // Return mock loans
                return [
                    {
                        id: 'LOAN-000001',
                        document_id: 'DOC-000001',
                        amount: 40000,
                        interest_rate: 4.5,
                        status: { Approved: null },
                        created_at: Date.now(),
                        borrower: '2vxsx-fae',
                        repayment_date: Date.now() + (30 * 24 * 60 * 60 * 1000)
                    }
                ];
            },

            approve_loan: async (loanId) => {
                console.log('✅ Approving loan:', loanId);
                return { Ok: null };
            },

            repay_loan: async (loanId, amount) => {
                console.log('💳 Repaying loan:', { loanId, amount });
                return { Ok: null };
            },

            // Token Management
            get_balance: async () => {
                return 50000; // Mock balance
            },

            mint: async (amount) => {
                console.log('🪙 Minting tokens:', amount);
                return { Ok: null };
            },

            transfer: async (to, amount) => {
                console.log('💸 Transferring tokens:', { to, amount });
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

    // Document Management
    async submitDocument(acidNumber, ethereumTxHash, valueUsd) {
        if (!this.isInitialized) {
            throw new Error('Backend service not initialized');
        }
        return await this.actor.submit_document(acidNumber, ethereumTxHash, valueUsd);
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
}

// Export singleton instance
export const backendService = new BackendService();
export default backendService;
