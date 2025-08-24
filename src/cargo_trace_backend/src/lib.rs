use candid::{CandidType, Deserialize, Principal};
use ic_cdk::{query, update, caller};
use ic_cdk::export_candid;
use ic_stable_structures::memory_manager::{MemoryId, MemoryManager, VirtualMemory};
use ic_stable_structures::{DefaultMemoryImpl, StableBTreeMap, Storable};
use ic_stable_structures::storable::Bound;
use std::cell::RefCell;
use std::collections::HashMap;
mod login;
pub use login::*;

mod cargowatcher;
pub use cargowatcher::*;

// Define memory manager
type Memory = VirtualMemory<DefaultMemoryImpl>;

// Define stable storage
thread_local! {
    static MEMORY_MANAGER: RefCell<MemoryManager<DefaultMemoryImpl>> = RefCell::new(
        MemoryManager::init(DefaultMemoryImpl::default())
    );
    static DOCUMENTS: RefCell<StableBTreeMap<String, Document, Memory>> = RefCell::new(
        StableBTreeMap::init(MEMORY_MANAGER.with(|mm| mm.borrow().get(MemoryId::new(1))))
    );

    static LOANS: RefCell<StableBTreeMap<String, Loan, Memory>> = RefCell::new(
        StableBTreeMap::init(MEMORY_MANAGER.with(|mm| mm.borrow().get(MemoryId::new(2))))
    );

    static ACID_VALIDATIONS: RefCell<StableBTreeMap<String, AcidValidation, Memory>> = RefCell::new(
        StableBTreeMap::init(MEMORY_MANAGER.with(|mm| mm.borrow().get(MemoryId::new(3))))
    );

    static BALANCES: RefCell<StableBTreeMap<Principal, u64, Memory>> = RefCell::new(
        StableBTreeMap::init(MEMORY_MANAGER.with(|mm| mm.borrow().get(MemoryId::new(4))))
    );
    // static TRANSFERS: std::cell::RefCell<Vec<TransferPayload>> = std::cell::RefCell::new(Vec::new());

    static COUNTERS: RefCell<HashMap<String, u64>> = RefCell::new(HashMap::new());
}

// #[derive(Clone, Debug, CandidType, Deserialize)]
// pub struct TransferPayload {
//     network: String,
//     contract: String,
//     tx_hash: String,
//     block_number: u64,
//     token_id: String,
//     from: String,
//     to: String,
//     log_index: u64,
// }

// #[update]
// fn ingest_transfer(payload: TransferPayload) {
// ic_cdk::println!("Got transfer JSON: {:?}", payload);
// }

// #[ic_cdk::query]
// fn get_transfers() -> Vec<TransferPayload> {
//     TRANSFERS.with(|t| t.borrow().clone())

// }
// Data structures
#[derive(CandidType, Deserialize, Clone)]
pub struct Document {
    pub id: String,
    pub acid_number: String,
    pub ethereum_tx_hash: String,
    pub value_usd: u64,
    pub status: DocumentStatus,
    pub created_at: u64,
    pub owner: Principal,
}

#[derive(CandidType, Deserialize, Clone)]
pub enum DocumentStatus {
    Pending,
    Verified,
    Rejected,
    NftMinted,
}

#[derive(CandidType, Deserialize, Clone)]
pub struct Loan {
    pub id: String,
    pub document_id: String,
    pub amount: u64,
    pub interest_rate: f64,
    pub status: LoanStatus,
    pub created_at: u64,
    pub borrower: Principal,
    pub repayment_date: u64,
}

#[derive(CandidType, Deserialize, Clone)]
pub enum LoanStatus {
    Pending,
    Approved,
    Active,
    Repaid,
    Defaulted,
}

#[derive(CandidType, Deserialize, Clone)]
pub struct AcidValidation {
    pub acid_number: String,
    pub is_valid: bool,
    pub customs_data: Option<String>,
    pub validation_date: u64,
}

// Storable implementations
impl Storable for Document {
    fn to_bytes(&self) -> std::borrow::Cow<[u8]> {
        let mut bytes = Vec::new();
        bytes.extend_from_slice(self.id.as_bytes());
        bytes.push(0);
        bytes.extend_from_slice(self.acid_number.as_bytes());
        bytes.push(0);
        bytes.extend_from_slice(self.ethereum_tx_hash.as_bytes());
        bytes.push(0);
        bytes.extend_from_slice(&self.value_usd.to_le_bytes());
        bytes.extend_from_slice(&self.created_at.to_le_bytes());
        bytes.extend_from_slice(&self.owner.as_slice());
        
        match &self.status {
            DocumentStatus::Pending => bytes.push(0),
            DocumentStatus::Verified => bytes.push(1),
            DocumentStatus::Rejected => bytes.push(2),
            DocumentStatus::NftMinted => bytes.push(3),
        }
        
        std::borrow::Cow::Owned(bytes)
    }

    fn from_bytes(bytes: std::borrow::Cow<[u8]>) -> Self {
        let bytes = bytes.as_ref();
        let mut pos = 0;
        
        let id_end = bytes[pos..].iter().position(|&b| b == 0).unwrap();
        let id = String::from_utf8(bytes[pos..pos+id_end].to_vec()).unwrap();
        pos += id_end + 1;
        
        let acid_end = bytes[pos..].iter().position(|&b| b == 0).unwrap();
        let acid_number = String::from_utf8(bytes[pos..pos+acid_end].to_vec()).unwrap();
        pos += acid_end + 1;
        
        let tx_end = bytes[pos..].iter().position(|&b| b == 0).unwrap();
        let ethereum_tx_hash = String::from_utf8(bytes[pos..pos+tx_end].to_vec()).unwrap();
        pos += tx_end + 1;
        
        let value_usd = u64::from_le_bytes(bytes[pos..pos+8].try_into().unwrap());
        pos += 8;
        
        let created_at = u64::from_le_bytes(bytes[pos..pos+8].try_into().unwrap());
        pos += 8;
        
        let owner = Principal::from_slice(&bytes[pos..pos+29]);
        pos += 29;
        
        let status = match bytes[pos] {
            0 => DocumentStatus::Pending,
            1 => DocumentStatus::Verified,
            2 => DocumentStatus::Rejected,
            3 => DocumentStatus::NftMinted,
            _ => DocumentStatus::Pending,
        };
        
        Document {
            id,
            acid_number,
            ethereum_tx_hash,
            value_usd,
            status,
            created_at,
            owner,
        }
    }

    fn into_bytes(self) -> Vec<u8> {
        self.to_bytes().into_owned()
    }

    const BOUND: Bound = Bound::Bounded {
        max_size: 1024,
        is_fixed_size: false,
    };
}

impl Storable for Loan {
    fn to_bytes(&self) -> std::borrow::Cow<[u8]> {
        let mut bytes = Vec::new();
        bytes.extend_from_slice(self.id.as_bytes());
        bytes.push(0);
        bytes.extend_from_slice(self.document_id.as_bytes());
        bytes.push(0);
        bytes.extend_from_slice(&self.amount.to_le_bytes());
        bytes.extend_from_slice(&self.interest_rate.to_le_bytes());
        bytes.extend_from_slice(&self.created_at.to_le_bytes());
        bytes.extend_from_slice(&self.repayment_date.to_le_bytes());
        bytes.extend_from_slice(&self.borrower.as_slice());
        
        match &self.status {
            LoanStatus::Pending => bytes.push(0),
            LoanStatus::Approved => bytes.push(1),
            LoanStatus::Active => bytes.push(2),
            LoanStatus::Repaid => bytes.push(3),
            LoanStatus::Defaulted => bytes.push(4),
        }
        
        std::borrow::Cow::Owned(bytes)
    }

    fn from_bytes(bytes: std::borrow::Cow<[u8]>) -> Self {
        let bytes = bytes.as_ref();
        let mut pos = 0;
        
        let id_end = bytes[pos..].iter().position(|&b| b == 0).unwrap();
        let id = String::from_utf8(bytes[pos..pos+id_end].to_vec()).unwrap();
        pos += id_end + 1;
        
        let doc_end = bytes[pos..].iter().position(|&b| b == 0).unwrap();
        let document_id = String::from_utf8(bytes[pos..pos+doc_end].to_vec()).unwrap();
        pos += doc_end + 1;
        
        let amount = u64::from_le_bytes(bytes[pos..pos+8].try_into().unwrap());
        pos += 8;
        
        let interest_rate = f64::from_le_bytes(bytes[pos..pos+8].try_into().unwrap());
        pos += 8;
        
        let created_at = u64::from_le_bytes(bytes[pos..pos+8].try_into().unwrap());
        pos += 8;
        
        let repayment_date = u64::from_le_bytes(bytes[pos..pos+8].try_into().unwrap());
        pos += 8;
        
        let borrower = Principal::from_slice(&bytes[pos..pos+29]);
        pos += 29;
        
        let status = match bytes[pos] {
            0 => LoanStatus::Pending,
            1 => LoanStatus::Approved,
            2 => LoanStatus::Active,
            3 => LoanStatus::Repaid,
            4 => LoanStatus::Defaulted,
            _ => LoanStatus::Pending,
        };
        
        Loan {
            id,
            document_id,
            amount,
            interest_rate,
            status,
            created_at,
            borrower,
            repayment_date,
        }
    }

    fn into_bytes(self) -> Vec<u8> {
        self.to_bytes().into_owned()
    }

    const BOUND: Bound = Bound::Bounded {
        max_size: 1024,
        is_fixed_size: false,
    };
}

impl Storable for AcidValidation {
    fn to_bytes(&self) -> std::borrow::Cow<[u8]> {
        let mut bytes = Vec::new();
        bytes.extend_from_slice(self.acid_number.as_bytes());
        bytes.push(0);
        bytes.push(if self.is_valid { 1 } else { 0 });
        bytes.extend_from_slice(&self.validation_date.to_le_bytes());
        
        if let Some(ref data) = self.customs_data {
            bytes.extend_from_slice(data.as_bytes());
        }
        bytes.push(0);
        
        std::borrow::Cow::Owned(bytes)
    }

    fn from_bytes(bytes: std::borrow::Cow<[u8]>) -> Self {
        let bytes = bytes.as_ref();
        let mut pos = 0;
        
        let acid_end = bytes[pos..].iter().position(|&b| b == 0).unwrap();
        let acid_number = String::from_utf8(bytes[pos..pos+acid_end].to_vec()).unwrap();
        pos += acid_end + 1;
        
        let is_valid = bytes[pos] == 1;
        pos += 1;
        
        let validation_date = u64::from_le_bytes(bytes[pos..pos+8].try_into().unwrap());
        pos += 8;
        
        let customs_data = if pos < bytes.len() - 1 {
            let data_end = bytes[pos..].iter().position(|&b| b == 0).unwrap_or(bytes.len() - pos);
            if data_end > 0 {
                Some(String::from_utf8(bytes[pos..pos+data_end].to_vec()).unwrap())
            } else {
                None
            }
        } else {
            None
        };
        
        AcidValidation {
            acid_number,
            is_valid,
            customs_data,
            validation_date,
        }
    }

    fn into_bytes(self) -> Vec<u8> {
        self.to_bytes().into_owned()
    }

    const BOUND: Bound = Bound::Bounded {
        max_size: 512,
        is_fixed_size: false,
    };
}

// Helper function to get next ID
fn get_next_id(counter_name: &str) -> u64 {
    COUNTERS.with(|counters| {
        let mut counters = counters.borrow_mut();
        let id = counters.get(counter_name).unwrap_or(&0) + 1;
        counters.insert(counter_name.to_string(), id);
        id
    })
}

// ACID Validation Functions
#[update]
pub fn validate_acid(acid_number: String) -> Result<bool, String> {
    if acid_number.len() != 9 || !acid_number.chars().all(char::is_numeric) {
        return Err("Invalid ACID format. Must be 9 digits.".to_string());
    }

    let is_valid = is_acid_in_static_dataset(&acid_number);
    
    let validation = AcidValidation {
        acid_number: acid_number.clone(),
        is_valid,
        customs_data: if is_valid { Some("Simulated customs data".to_string()) } else { None },
        validation_date: ic_cdk::api::time(),
    };
    
    ACID_VALIDATIONS.with(|validations| {
        validations.borrow_mut().insert(acid_number, validation);
    });
    
    Ok(is_valid)
}

#[query]
pub fn get_acid_validation(acid_number: String) -> Option<AcidValidation> {
    ACID_VALIDATIONS.with(|validations| {
        validations.borrow().get(&acid_number)
    })
}

fn is_acid_in_static_dataset(acid_number: &str) -> bool {
    let valid_acids = vec![
        "123456789",
        "987654321", 
        "456789123",
        "789123456",
        "321654987"
    ];
    valid_acids.contains(&acid_number)
}

// Document Management Functions
#[update]
pub fn submit_document(acid_number: String, ethereum_tx_hash: String, value_usd: u64) -> Result<String, String> {
    let acid_validation = validate_acid(acid_number.clone())?;
    if !acid_validation {
        return Err("Invalid ACID number.".to_string());
    }

    let document_id = format!("DOC-{:06}", get_next_id("document"));
    let document = Document {
        id: document_id.clone(),
        acid_number,
        ethereum_tx_hash,
        value_usd,
        status: DocumentStatus::Pending,
        created_at: ic_cdk::api::time(),
        owner: caller(),
    };

    DOCUMENTS.with(|documents| {
        documents.borrow_mut().insert(document_id.clone(), document);
    });

    Ok(document_id)
}

#[query]
pub fn get_document(document_id: String) -> Option<Document> {
    DOCUMENTS.with(|documents| {
        documents.borrow().get(&document_id)
    })
}

#[query]
pub fn get_my_documents() -> Vec<Document> {
    let caller = caller();
    DOCUMENTS.with(|documents| {
        documents.borrow()
            .iter()
            .filter(|entry| entry.value().owner == caller)
            .map(|entry| entry.value().clone())
            .collect()
    })
}

#[update]
pub fn approve_document(document_id: String) -> Result<(), String> {
    let caller = caller();
    
    DOCUMENTS.with(|documents| {
        let mut documents = documents.borrow_mut();
        if let Some(mut document) = documents.get(&document_id) {
            if document.owner != caller {
                return Err("Only document owner can approve.".to_string());
            }
            
            document.status = DocumentStatus::NftMinted;
            documents.insert(document_id, document);
            Ok(())
        } else {
            Err("Document not found.".to_string())
        }
    })
}

// Loan Management Functions
#[update]
pub fn request_loan(document_id: String, amount: u64, repayment_date: u64) -> Result<String, String> {
    let caller = caller();
    
    let document = get_document(document_id.clone()).ok_or("Document not found.")?;
    
    match document.status {
        DocumentStatus::NftMinted => {},
        _ => return Err("Document must be approved and NFT minted before requesting loan.".to_string()),
    }
    
    if amount > document.value_usd * 80 / 100 {
        return Err("Loan amount cannot exceed 80% of document value.".to_string());
    }
    
    let loan_id = format!("LOAN-{:06}", get_next_id("loan"));
    let loan = Loan {
        id: loan_id.clone(),
        document_id,
        amount,
        interest_rate: 4.5,
        status: LoanStatus::Pending,
        created_at: ic_cdk::api::time(),
        borrower: caller,
        repayment_date,
    };
    
    LOANS.with(|loans| {
        loans.borrow_mut().insert(loan_id.clone(), loan);
    });
    
    Ok(loan_id)
}

#[update]
pub fn approve_loan(loan_id: String) -> Result<(), String> {
    LOANS.with(|loans| {
        let mut loans = loans.borrow_mut();
        if let Some(mut loan) = loans.get(&loan_id) {
            loan.status = LoanStatus::Approved;
            loans.insert(loan_id, loan.clone());
            
            BALANCES.with(|balances| {
                let mut balances = balances.borrow_mut();
                let current_balance = balances.get(&loan.borrower).unwrap_or(0);
                balances.insert(loan.borrower, current_balance + loan.amount);
            });
            
            Ok(())
        } else {
            Err("Loan not found.".to_string())
        }
    })
}

#[query]
pub fn get_loan(loan_id: String) -> Option<Loan> {
    LOANS.with(|loans| {
        loans.borrow().get(&loan_id)
    })
}

#[query]
pub fn get_my_loans() -> Vec<Loan> {
    let caller = caller();
    LOANS.with(|loans| {
        loans.borrow()
            .iter()
            .filter(|entry| entry.value().borrower == caller)
            .map(|entry| entry.value().clone())
            .collect()
    })
}

#[update]
pub fn repay_loan(loan_id: String, amount: u64) -> Result<(), String> {
    let caller = caller();
    
    let current_balance = get_balance();
    if current_balance < amount {
        return Err("Insufficient balance for repayment.".to_string());
    }
    
    LOANS.with(|loans| {
        let mut loans = loans.borrow_mut();
        if let Some(mut loan) = loans.get(&loan_id) {
            if loan.borrower != caller {
                return Err("Only loan borrower can repay.".to_string());
            }
            
            BALANCES.with(|balances| {
                let mut balances = balances.borrow_mut();
                let current_balance = balances.get(&caller).unwrap_or(0);
                balances.insert(caller, current_balance - amount);
            });
            
            if amount >= loan.amount {
                loan.status = LoanStatus::Repaid;
            }
            loans.insert(loan_id, loan);
            
            Ok(())
        } else {
            Err("Loan not found.".to_string())
        }
    })
}

// Token Management Functions
#[query]
pub fn get_balance() -> u64 {
    let caller = caller();
    BALANCES.with(|balances| {
        balances.borrow().get(&caller).unwrap_or(0)
    })
}

#[update]
pub fn mint(amount: u64) {
    let caller = caller();
    BALANCES.with(|balances| {
        let mut balances = balances.borrow_mut();
        let current_balance = balances.get(&caller).unwrap_or(0);
        balances.insert(caller, current_balance + amount);
    });
}

#[update]
pub fn transfer(to: Principal, amount: u64) -> Result<(), String> {
    let caller = caller();
    
    let current_balance = get_balance();
    if current_balance < amount {
        return Err("Insufficient balance.".to_string());
    }

    BALANCES.with(|balances| {
        let mut balances = balances.borrow_mut();
        
        let sender_balance = balances.get(&caller).unwrap_or(0);
        balances.insert(caller, sender_balance - amount);
        
        let recipient_balance = balances.get(&to).unwrap_or(0);
        balances.insert(to, recipient_balance + amount);
    });

        Ok(())
}
// Legacy functions
#[update]
pub fn add_id(_id: u64) -> bool {
    true
}

#[query]
pub fn get_all_ids() -> Vec<u64> {
    vec![1, 2, 3]
}

#[query]
pub fn has_id(id: u64) -> bool {
    id > 0
}

#[update]
pub fn remove_id(_id: u64) -> bool {
    true
}

// Export Candid interface
export_candid!();
