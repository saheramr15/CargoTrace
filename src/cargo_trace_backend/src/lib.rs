use candid::{CandidType, Deserialize, Principal};
use ic_cdk::{query, update, caller, pre_upgrade, post_upgrade};
use ic_cdk::export_candid;
use ic_stable_structures::memory_manager::{MemoryId, MemoryManager, VirtualMemory};
use ic_stable_structures::{DefaultMemoryImpl, StableBTreeMap, Storable};
use ic_stable_structures::storable::Bound;
use std::cell::RefCell;
use std::collections::HashMap;
// Remove duplicate Principal import

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

    static CARGOX_MAPPINGS: RefCell<StableBTreeMap<String, CargoXMapping, Memory>> = RefCell::new(
        StableBTreeMap::init(MEMORY_MANAGER.with(|mm| mm.borrow().get(MemoryId::new(5))))
    );

    static CUSTOMS_VERIFICATIONS: RefCell<StableBTreeMap<String, CustomsVerification, Memory>> = RefCell::new(
        StableBTreeMap::init(MEMORY_MANAGER.with(|mm| mm.borrow().get(MemoryId::new(6))))
    );

    static COUNTERS: RefCell<HashMap<String, u64>> = RefCell::new(HashMap::new());
}

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

#[derive(CandidType, Deserialize, PartialEq, Clone)]
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

#[derive(CandidType, Deserialize, PartialEq, Clone)]
pub enum LoanStatus {
    Pending,
    Approved,
    Active,
    Repaid,
    Defaulted,
    Rejected,
}

#[derive(CandidType, Deserialize, Clone)]
pub struct AcidValidation {
    pub acid_number: String,
    pub is_valid: bool,
    pub customs_data: Option<String>,
    pub validation_date: u64,
}

#[derive(CandidType, Deserialize, Clone)]
pub struct CargoXMapping {
    pub id: String,
    pub nft_hash: String,
    pub acid_number: String,
    pub verified: bool,
    pub created_at: u64,
    pub owner: Principal,
    pub customs_entry_id: Option<String>,
}

#[derive(CandidType, Deserialize, Clone)]
pub struct CustomsVerification {
    pub id: String,
    pub nft_hash: String,
    pub acid_number: String,
    pub verification_status: CustomsStatus,
    pub verified_at: Option<u64>,
    pub customs_data: Option<String>,
    pub created_at: u64,
    pub verified_by: Option<Principal>,
}

#[derive(CandidType, Deserialize, Clone)]
pub enum CustomsStatus {
    Pending,
    Verified,
    Rejected,
    UnderReview,
}

// Fixed Storable implementation for Document with proper bounds checking
impl Storable for Document {
    fn to_bytes(&self) -> std::borrow::Cow<[u8]> {
        let mut bytes = Vec::new();
        
        // Store strings with null terminators
        bytes.extend_from_slice(self.id.as_bytes());
        bytes.push(0);
        
        bytes.extend_from_slice(self.acid_number.as_bytes());
        bytes.push(0);
        
        bytes.extend_from_slice(self.ethereum_tx_hash.as_bytes());
        bytes.push(0);
        
        // Store fixed-size integers
        bytes.extend_from_slice(&self.value_usd.to_le_bytes());
        bytes.extend_from_slice(&self.created_at.to_le_bytes());
        
        // Store Principal with length prefix (CRITICAL FIX)
        let owner_bytes = self.owner.as_slice();
        bytes.push(owner_bytes.len() as u8); // Store length first
        bytes.extend_from_slice(owner_bytes);
        
        // Store status as single byte
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
        
        // Helper function for safe bounds checking
        let check_bounds = |pos: usize, needed: usize, total: usize| -> Result<(), String> {
            if pos + needed > total {
                return Err(format!(
                    "Buffer underrun: need {} bytes at position {}, but only {} bytes total", 
                    needed, pos, total
                ));
            }
            Ok(())
        };
        
        // Read ID string
        let id = match bytes[pos..].iter().position(|&b| b == 0) {
            Some(id_end) => {
                check_bounds(pos, id_end, bytes.len()).expect("ID bounds check failed");
                let id = String::from_utf8(bytes[pos..pos+id_end].to_vec())
                    .expect("Invalid UTF-8 in ID");
                pos += id_end + 1;
                id
            }
            None => panic!("No null terminator found for ID")
        };
        
        // Read ACID number string
        let acid_number = match bytes[pos..].iter().position(|&b| b == 0) {
            Some(acid_end) => {
                check_bounds(pos, acid_end, bytes.len()).expect("ACID bounds check failed");
                let acid = String::from_utf8(bytes[pos..pos+acid_end].to_vec())
                    .expect("Invalid UTF-8 in ACID number");
                pos += acid_end + 1;
                acid
            }
            None => panic!("No null terminator found for ACID number")
        };
        
        // Read Ethereum TX hash string
        let ethereum_tx_hash = match bytes[pos..].iter().position(|&b| b == 0) {
            Some(tx_end) => {
                check_bounds(pos, tx_end, bytes.len()).expect("TX hash bounds check failed");
                let tx_hash = String::from_utf8(bytes[pos..pos+tx_end].to_vec())
                    .expect("Invalid UTF-8 in TX hash");
                pos += tx_end + 1;
                tx_hash
            }
            None => panic!("No null terminator found for TX hash")
        };
        
        // Read value_usd (8 bytes)
        check_bounds(pos, 8, bytes.len()).expect("Value USD bounds check failed");
        let value_usd = u64::from_le_bytes(
            bytes[pos..pos+8].try_into().expect("Failed to parse value_usd")
        );
        pos += 8;
        
        // Read created_at (8 bytes)
        check_bounds(pos, 8, bytes.len()).expect("Created at bounds check failed");
        let created_at = u64::from_le_bytes(
            bytes[pos..pos+8].try_into().expect("Failed to parse created_at")
        );
        pos += 8;
        
        // Read Principal with dynamic length (CRITICAL FIX)
        check_bounds(pos, 1, bytes.len()).expect("Principal length bounds check failed");
        let principal_len = bytes[pos] as usize;
        pos += 1;
        
        check_bounds(pos, principal_len, bytes.len()).expect("Principal data bounds check failed");
        let owner = Principal::from_slice(&bytes[pos..pos+principal_len]);
        pos += principal_len;
        
        // Read status (1 byte)
        check_bounds(pos, 1, bytes.len()).expect("Status bounds check failed");
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
        max_size: 2048,
        is_fixed_size: false,
    };
}

// Fixed Storable implementation for Loan (same Principal issue)
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
        
        // Fixed: Store Principal with length prefix
        let borrower_bytes = self.borrower.as_slice();
        bytes.push(borrower_bytes.len() as u8);
        bytes.extend_from_slice(borrower_bytes);
        
        match &self.status {
            LoanStatus::Pending => bytes.push(0),
            LoanStatus::Approved => bytes.push(1),
            LoanStatus::Active => bytes.push(2),
            LoanStatus::Repaid => bytes.push(3),
            LoanStatus::Defaulted => bytes.push(4),
            LoanStatus::Rejected => bytes.push(5),
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
        
        // Fixed: Read Principal with dynamic length
        let principal_len = bytes[pos] as usize;
        pos += 1;
        let borrower = Principal::from_slice(&bytes[pos..pos+principal_len]);
        pos += principal_len;
        
        let status = match bytes[pos] {
            0 => LoanStatus::Pending,
            1 => LoanStatus::Approved,
            2 => LoanStatus::Active,
            3 => LoanStatus::Repaid,
            4 => LoanStatus::Defaulted,
            5 => LoanStatus::Rejected,
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

// Keep other Storable implementations as they were (they don't use the broken Principal pattern)
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

// Fixed CargoXMapping and CustomsVerification (they also have the Principal issue)
impl Storable for CargoXMapping {
    fn to_bytes(&self) -> std::borrow::Cow<[u8]> {
        let mut bytes = Vec::new();
        bytes.extend_from_slice(self.id.as_bytes());
        bytes.push(0);
        bytes.extend_from_slice(self.nft_hash.as_bytes());
        bytes.push(0);
        bytes.extend_from_slice(self.acid_number.as_bytes());
        bytes.push(0);
        bytes.push(if self.verified { 1 } else { 0 });
        bytes.extend_from_slice(&self.created_at.to_le_bytes());
        
        // Fixed: Store Principal with length prefix
        let owner_bytes = self.owner.as_slice();
        bytes.push(owner_bytes.len() as u8);
        bytes.extend_from_slice(owner_bytes);
        
        if let Some(ref entry_id) = self.customs_entry_id {
            bytes.extend_from_slice(entry_id.as_bytes());
        }
        bytes.push(0);
        
        std::borrow::Cow::Owned(bytes)
    }

    fn from_bytes(bytes: std::borrow::Cow<[u8]>) -> Self {
        let bytes = bytes.as_ref();
        let mut pos = 0;
        
        let id_end = bytes[pos..].iter().position(|&b| b == 0).unwrap();
        let id = String::from_utf8(bytes[pos..pos+id_end].to_vec()).unwrap();
        pos += id_end + 1;
        
        let nft_end = bytes[pos..].iter().position(|&b| b == 0).unwrap();
        let nft_hash = String::from_utf8(bytes[pos..pos+nft_end].to_vec()).unwrap();
        pos += nft_end + 1;
        
        let acid_end = bytes[pos..].iter().position(|&b| b == 0).unwrap();
        let acid_number = String::from_utf8(bytes[pos..pos+acid_end].to_vec()).unwrap();
        pos += acid_end + 1;
        
        let verified = bytes[pos] == 1;
        pos += 1;
        
        let created_at = u64::from_le_bytes(bytes[pos..pos+8].try_into().unwrap());
        pos += 8;
        
        // Fixed: Read Principal with dynamic length
        let principal_len = bytes[pos] as usize;
        pos += 1;
        let owner = Principal::from_slice(&bytes[pos..pos+principal_len]);
        pos += principal_len;
        
        let customs_entry_id = if pos < bytes.len() - 1 {
            let entry_end = bytes[pos..].iter().position(|&b| b == 0).unwrap_or(bytes.len() - pos);
            if entry_end > 0 {
                Some(String::from_utf8(bytes[pos..pos+entry_end].to_vec()).unwrap())
            } else {
                None
            }
        } else {
            None
        };
        
        CargoXMapping {
            id,
            nft_hash,
            acid_number,
            verified,
            created_at,
            owner,
            customs_entry_id,
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

impl Storable for CustomsVerification {
    fn to_bytes(&self) -> std::borrow::Cow<[u8]> {
        let mut bytes = Vec::new();
        bytes.extend_from_slice(self.id.as_bytes());
        bytes.push(0);
        bytes.extend_from_slice(self.nft_hash.as_bytes());
        bytes.push(0);
        bytes.extend_from_slice(self.acid_number.as_bytes());
        bytes.push(0);
        
        match &self.verification_status {
            CustomsStatus::Pending => bytes.push(0),
            CustomsStatus::Verified => bytes.push(1),
            CustomsStatus::Rejected => bytes.push(2),
            CustomsStatus::UnderReview => bytes.push(3),
        }
        
        if let Some(verified_at) = self.verified_at {
            bytes.push(1);
            bytes.extend_from_slice(&verified_at.to_le_bytes());
        } else {
            bytes.push(0);
        }
        
        if let Some(ref data) = self.customs_data {
            bytes.extend_from_slice(data.as_bytes());
        }
        bytes.push(0);
        
        bytes.extend_from_slice(&self.created_at.to_le_bytes());
        
        if let Some(verified_by) = self.verified_by {
            bytes.push(1);
            // Fixed: Store Principal with length prefix
            let principal_bytes = verified_by.as_slice();
            bytes.push(principal_bytes.len() as u8);
            bytes.extend_from_slice(principal_bytes);
        } else {
            bytes.push(0);
        }
        
        std::borrow::Cow::Owned(bytes)
    }

    fn from_bytes(bytes: std::borrow::Cow<[u8]>) -> Self {
        let bytes = bytes.as_ref();
        let mut pos = 0;
        
        let id_end = bytes[pos..].iter().position(|&b| b == 0).unwrap();
        let id = String::from_utf8(bytes[pos..pos+id_end].to_vec()).unwrap();
        pos += id_end + 1;
        
        let nft_end = bytes[pos..].iter().position(|&b| b == 0).unwrap();
        let nft_hash = String::from_utf8(bytes[pos..pos+nft_end].to_vec()).unwrap();
        pos += nft_end + 1;
        
        let acid_end = bytes[pos..].iter().position(|&b| b == 0).unwrap();
        let acid_number = String::from_utf8(bytes[pos..pos+acid_end].to_vec()).unwrap();
        pos += acid_end + 1;
        
        let verification_status = match bytes[pos] {
            0 => CustomsStatus::Pending,
            1 => CustomsStatus::Verified,
            2 => CustomsStatus::Rejected,
            3 => CustomsStatus::UnderReview,
            _ => CustomsStatus::Pending,
        };
        pos += 1;
        
        let verified_at = if bytes[pos] == 1 {
            pos += 1;
            let verified_at = u64::from_le_bytes(bytes[pos..pos+8].try_into().unwrap());
            pos += 8;
            Some(verified_at)
        } else {
            pos += 1;
            None
        };
        
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
        pos += customs_data.as_ref().map(|d| d.len() + 1).unwrap_or(1);
        
        let created_at = u64::from_le_bytes(bytes[pos..pos+8].try_into().unwrap());
        pos += 8;
        
        let verified_by = if bytes[pos] == 1 {
            pos += 1;
            // Fixed: Read Principal with dynamic length
            let principal_len = bytes[pos] as usize;
            pos += 1;
            Some(Principal::from_slice(&bytes[pos..pos+principal_len]))
        } else {
            None
        };
        
        CustomsVerification {
            id,
            nft_hash,
            acid_number,
            verification_status,
            verified_at,
            customs_data,
            created_at,
            verified_by,
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

// Consolidated upgrade functions that handle all modules
#[pre_upgrade]
fn pre_upgrade() {
    ic_cdk::println!("Preparing for upgrade...");
    
    // Save login module state using old stable storage
    use ic_cdk::storage;
    let principals = login::save_principals_state();
    storage::stable_save((principals,)).unwrap();
    
    // StableBTreeMap data (DOCUMENTS, LOANS, etc.) persists automatically
    ic_cdk::println!("Upgrade preparation complete");
}

#[post_upgrade]
fn post_upgrade() {
    ic_cdk::println!("Restoring state after upgrade...");
    
    // Restore login module state using old stable storage
    use ic_cdk::storage;
    use std::collections::BTreeSet;
    use candid::Principal;
    
    let (saved_principals,): (BTreeSet<Principal>,) = storage::stable_restore().unwrap();
    login::restore_principals_state(saved_principals);
    
    // StableBTreeMap data (DOCUMENTS, LOANS, etc.) automatically restored
    ic_cdk::println!("State restoration complete");
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
    // Remove owner check to allow admin approval
    DOCUMENTS.with(|documents| {
        let mut documents = documents.borrow_mut();
        if let Some(mut document) = documents.get(&document_id) {
            if document.status != DocumentStatus::Pending {
                return Err("Can only approve pending documents.".to_string());
            }
            document.status = DocumentStatus::NftMinted;
            documents.insert(document_id, document);
            Ok(())
        } else {
            Err("Document not found.".to_string())
        }
    })
}



#[update]
pub fn reject_document(document_id: String) -> Result<(), String> {
    let caller = caller();
    
    DOCUMENTS.with(|documents| {
        let mut documents = documents.borrow_mut();
        if let Some(mut document) = documents.get(&document_id) {
            if document.owner != caller {
                return Err("Only document owner can reject.".to_string());
            }
            if document.status != DocumentStatus::Pending {
                return Err("Can only reject pending documents.".to_string());
            }
            
            document.status = DocumentStatus::Rejected;
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

#[query]
pub fn get_all_loans() -> Vec<Loan> {
    LOANS.with(|loans| {
        loans.borrow()
            .iter()
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
#[update]
pub fn reject_loan(loan_id: String) -> Result<(), String> {
    LOANS.with(|loans| {
        let mut loans = loans.borrow_mut();
        if let Some(mut loan) = loans.get(&loan_id) {
            if loan.status != LoanStatus::Pending {
                return Err("Can only reject pending loans.".to_string());
            }
            loan.status = LoanStatus::Rejected;
            loans.insert(loan_id, loan.clone());
            Ok(())
        } else {
            Err("Loan not found.".to_string())
        }
    })
}

#[query]
pub fn get_all_loan_ids() -> Vec<String> {
    LOANS.with(|loans| {
        loans.borrow()
            .iter()
            .map(|entry| entry.key().clone())
            .collect()
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

// ============================================================================
// CUSTOMS INTEGRATION FUNCTIONS
// ============================================================================

// Customs Matcher Module Functions
#[update]
pub fn link_cargox_to_acid(nft_hash: String, acid_number: String) -> Result<String, String> {
    // Validate ACID first
    let acid_validation = validate_acid(acid_number.clone())?;
    if !acid_validation {
        return Err("Invalid ACID number.".to_string());
    }

    // Check if mapping already exists
    if CARGOX_MAPPINGS.with(|mappings| mappings.borrow().get(&nft_hash).is_some()) {
        return Err("CargoX NFT hash already linked to an ACID number.".to_string());
    }

    // Create mapping
    let mapping_id = format!("MAP-{:06}", get_next_id("mapping"));
    let mapping = CargoXMapping {
        id: mapping_id.clone(),
        nft_hash: nft_hash.clone(),
        acid_number: acid_number.clone(),
        verified: false,
        created_at: ic_cdk::api::time(),
        owner: caller(),
        customs_entry_id: None,
    };

    CARGOX_MAPPINGS.with(|mappings| {
        mappings.borrow_mut().insert(nft_hash.clone(), mapping);
    });

    // Create customs verification record
    let verification_id = format!("VER-{:06}", get_next_id("verification"));
    let verification = CustomsVerification {
        id: verification_id,
        nft_hash: nft_hash.clone(),
        acid_number: acid_number.clone(),
        verification_status: CustomsStatus::Pending,
        verified_at: None,
        customs_data: None,
        created_at: ic_cdk::api::time(),
        verified_by: None,
    };

    CUSTOMS_VERIFICATIONS.with(|verifications| {
        verifications.borrow_mut().insert(nft_hash, verification);
    });

    Ok(mapping_id)
}

#[query]
pub fn get_cargox_mapping(nft_hash: String) -> Option<CargoXMapping> {
    CARGOX_MAPPINGS.with(|mappings| {
        mappings.borrow().get(&nft_hash)
    })
}

#[query]
pub fn get_my_cargox_mappings() -> Vec<CargoXMapping> {
    let caller = caller();
    CARGOX_MAPPINGS.with(|mappings| {
        mappings.borrow()
            .iter()
            .filter(|entry| entry.value().owner == caller)
            .map(|entry| entry.value().clone())
            .collect()
    })
}

#[query]
pub fn get_all_cargox_mappings() -> Vec<CargoXMapping> {
    CARGOX_MAPPINGS.with(|mappings| {
        mappings.borrow()
            .iter()
            .map(|entry| entry.value().clone())
            .collect()
    })
}

// Verification Flow Functions
#[update]
pub fn verify_customs_entry(nft_hash: String) -> Result<(), String> {
    // Find the mapping
    let mapping = CARGOX_MAPPINGS.with(|mappings| {
        mappings.borrow().get(&nft_hash)
    }).ok_or("CargoX mapping not found")?;

    // Update mapping as verified
    CARGOX_MAPPINGS.with(|mappings| {
        let mut mappings = mappings.borrow_mut();
        if let Some(mut mapping) = mappings.get(&nft_hash) {
            mapping.verified = true;
            mappings.insert(nft_hash.clone(), mapping);
        }
    });

    // Update customs verification status
    CUSTOMS_VERIFICATIONS.with(|verifications| {
        let mut verifications = verifications.borrow_mut();
        if let Some(mut verification) = verifications.get(&nft_hash) {
            verification.verification_status = CustomsStatus::Verified;
            verification.verified_at = Some(ic_cdk::api::time());
            verification.verified_by = Some(caller());
            verification.customs_data = Some("Customs entry verified manually".to_string());
            verifications.insert(nft_hash.clone(), verification);
        }
    });

    // Find and update related document
    let document = DOCUMENTS.with(|documents| {
        documents.borrow()
            .iter()
            .find(|entry| entry.value().ethereum_tx_hash == nft_hash)
            .map(|entry| entry.value().clone())
    });

    if let Some(mut doc) = document {
        doc.status = DocumentStatus::Verified;
        DOCUMENTS.with(|documents| {
            documents.borrow_mut().insert(doc.id.clone(), doc);
        });
    }

    Ok(())
}

#[update]
pub fn reject_customs_entry(nft_hash: String, reason: String) -> Result<(), String> {
    // Update customs verification status
    CUSTOMS_VERIFICATIONS.with(|verifications| {
        let mut verifications = verifications.borrow_mut();
        if let Some(mut verification) = verifications.get(&nft_hash) {
            verification.verification_status = CustomsStatus::Rejected;
            verification.verified_at = Some(ic_cdk::api::time());
            verification.verified_by = Some(caller());
            verification.customs_data = Some(format!("Rejected: {}", reason));
            verifications.insert(nft_hash.clone(), verification);
        }
    });

    // Find and update related document
    let document = DOCUMENTS.with(|documents| {
        documents.borrow()
            .iter()
            .find(|entry| entry.value().ethereum_tx_hash == nft_hash)
            .map(|entry| entry.value().clone())
    });

    if let Some(mut doc) = document {
        doc.status = DocumentStatus::Rejected;
        DOCUMENTS.with(|documents| {
            documents.borrow_mut().insert(doc.id.clone(), doc);
        });
    }

    Ok(())
}

#[query]
pub fn get_customs_verification(nft_hash: String) -> Option<CustomsVerification> {
    CUSTOMS_VERIFICATIONS.with(|verifications| {
        verifications.borrow().get(&nft_hash)
    })
}

#[query]
pub fn get_all_customs_verifications() -> Vec<CustomsVerification> {
    CUSTOMS_VERIFICATIONS.with(|verifications| {
        verifications.borrow()
            .iter()
            .map(|entry| entry.value().clone())
            .collect()
    })
}

#[query]
pub fn get_pending_customs_verifications() -> Vec<CustomsVerification> {
    CUSTOMS_VERIFICATIONS.with(|verifications| {
        verifications.borrow()
            .iter()
            .filter(|entry| matches!(entry.value().verification_status, CustomsStatus::Pending))
            .map(|entry| entry.value().clone())
            .collect()
    })
}

// Lending Integration Functions
#[update]
pub fn trigger_lending(document_id: String) -> Result<(), String> {
    let document = get_document(document_id.clone())
        .ok_or("Document not found")?;

    // Check if document is verified
    match document.status {
        DocumentStatus::Verified => {
            // Mark document as ready for lending (NftMinted status)
            DOCUMENTS.with(|documents| {
                let mut documents = documents.borrow_mut();
                if let Some(mut doc) = documents.get(&document_id) {
                    doc.status = DocumentStatus::NftMinted;
                    documents.insert(document_id.clone(), doc);
                }
            });
            
            // TODO: Call Teammate 3's lending canister here
            // This is the integration point for the lending logic
            ic_cdk::println!("Triggering lending for document: {}", document_id);
            
            // For now, we'll just log the trigger
            // In production, this would call the lending canister
            // Example: lending_canister.trigger_loan(document_id, document.value_usd, document.owner)
            
            Ok(())
        },
        DocumentStatus::NftMinted => {
            Ok(()) // Already ready for lending
        },
        _ => Err("Document must be verified before triggering lending".to_string())
    }
}

#[update]
pub fn batch_trigger_lending(document_ids: Vec<String>) -> Result<Vec<String>, String> {
    let mut successful = Vec::new();
    let mut failed = Vec::new();

    for document_id in document_ids {
        match trigger_lending(document_id.clone()) {
            Ok(_) => successful.push(document_id),
            Err(e) => failed.push(format!("{}: {}", document_id, e)),
        }
    }

    if failed.is_empty() {
        Ok(successful)
    } else {
        Err(format!("Some documents failed: {:?}", failed))
    }
}

// Utility Functions for Customs Integration
#[query]
pub fn get_document_by_nft_hash(nft_hash: String) -> Option<Document> {
    DOCUMENTS.with(|documents| {
        documents.borrow()
            .iter()
            .find(|entry| entry.value().ethereum_tx_hash == nft_hash)
            .map(|entry| entry.value().clone())
    })
}

#[query]
pub fn get_verification_stats() -> (u64, u64, u64, u64) {
    let (pending, verified, rejected, under_review) = CUSTOMS_VERIFICATIONS.with(|verifications| {
        let mut pending = 0;
        let mut verified = 0;
        let mut rejected = 0;
        let mut under_review = 0;

        for entry in verifications.borrow().iter() {
            match entry.value().verification_status {
                CustomsStatus::Pending => pending += 1,
                CustomsStatus::Verified => verified += 1,
                CustomsStatus::Rejected => rejected += 1,
                CustomsStatus::UnderReview => under_review += 1,
            }
        }

        (pending, verified, rejected, under_review)
    });

    (pending, verified, rejected, under_review)
}

// Export Candid interface
export_candid!();
