use candid::{CandidType, Deserialize, Principal};
use ic_cdk::{query, update, caller, pre_upgrade, post_upgrade, api::call::call};
use ic_cdk::export_candid;
use ic_stable_structures::memory_manager::{MemoryId, MemoryManager, VirtualMemory};
use ic_stable_structures::{DefaultMemoryImpl, StableBTreeMap, Storable};
use ic_stable_structures::storable::Bound;
use std::cell::RefCell;
use std::collections::HashMap;
use ic_cdk::api::management_canister::http_request::{TransformArgs, HttpResponse};
use num_bigint::BigUint;

mod login;
pub use login::*;
mod cargox_watcher;
pub use cargox_watcher::*;
mod cargowatcher;
pub use cargowatcher::*;

// ICRC-1 Types
#[derive(CandidType, Deserialize, Clone, Debug)]
pub struct Account {
    pub owner: Principal,
    pub subaccount: Option<Vec<u8>>,
}

#[derive(CandidType, Deserialize, Clone, Debug)]
pub struct TransferArgs {
    pub from_subaccount: Option<Vec<u8>>,
    pub to: Account,
    pub amount: candid::Nat,
    pub fee: Option<candid::Nat>,
    pub memo: Option<Vec<u8>>,
    pub created_at_time: Option<u64>,
}

#[derive(CandidType, Deserialize, Clone, Debug)]
pub enum TransferError {
    BadFee { expected_fee: candid::Nat },
    BadBurn { min_burn_amount: candid::Nat },
    InsufficientFunds { balance: candid::Nat },
    TooOld,
    CreatedInFuture { ledger_time: u64 },
    TemporarilyUnavailable,
    Duplicate { duplicate_of: candid::Nat },
    GenericError { error_code: candid::Nat, message: String },
}

// #[derive(CandidType, Deserialize, Clone, Debug)]
// pub struct BalanceArgs {
//     pub account: Account,
// }

// Configuration
const LEDGER_CANISTER_ID: &str = "umunu-kh777-77774-qaaca-cai"; // Replace with your actual ledger canister ID
const TRANSFER_FEE: u64 = 100_000; // 0.0001 TCIP (with 8 decimals)
const DECIMALS: u8 = 8;

// Convert USD to TCIP tokens (1 USD = 1 TCIP for testing)
fn usd_to_tokens(usd_amount: u64) -> u64 {
    usd_amount * 10_u64.pow(DECIMALS as u32)
}

// Convert tokens to USD
fn tokens_to_usd(token_amount: u64) -> u64 {
    token_amount / 10_u64.pow(DECIMALS as u32)
}

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
    static LEDGER_PRINCIPAL: RefCell<Option<Principal>> = RefCell::new(None);
}

// Initialize ledger principal (call this during canister init)
#[update]
pub async fn init_ledger_principal(ledger_id: String) -> Result<(), String> {
    let principal = Principal::from_text(ledger_id)
        .map_err(|e| format!("Invalid principal: {}", e))?;
    
    LEDGER_PRINCIPAL.with(|p| {
        *p.borrow_mut() = Some(principal);
    });
    
    Ok(())
}

// Get ledger principal
fn get_ledger_principal() -> Result<Principal, String> {
    LEDGER_PRINCIPAL.with(|p| {
        p.borrow().ok_or_else(|| "Ledger principal not initialized".to_string())
    })
}



// Remove the BalanceArgs struct entirely or update your check_canister_balance function:
#[update]
pub async fn check_canister_balance() -> Result<u64, String> {
    let canister_account = Account {
        owner: ic_cdk::api::id(),
        subaccount: None,
    };
    
    icrc1_balance_of(canister_account).await
}

#[update]
pub fn request_test_tokens(amount: u64) -> Result<(), String> {
    let token_amount = usd_to_tokens(amount);
    BALANCES.with(|b| {
        let mut balances = b.borrow_mut();
        let current = balances.get(&ic_cdk::api::id()).unwrap_or(0);
        balances.insert(ic_cdk::api::id(), current + token_amount);
    });
    ic_cdk::println!("Simulated funding: {} test tokens added to canister", token_amount);
    Ok(())
}

// Mock ICRC-1 transfer function for testing
async fn icrc1_transfer(args: TransferArgs) -> Result<candid::Nat, TransferError> {
    // Get canister and recipient balances before any mutations
    let balance = BALANCES.with(|b| b.borrow().get(&ic_cdk::api::id()).unwrap_or(0));
    let recipient_balance = BALANCES.with(|b| b.borrow().get(&args.to.owner).unwrap_or(0));

    let amount: u64 = args.amount.0.try_into().map_err(|_| TransferError::GenericError {
        error_code: candid::Nat::from(1u64),
        message: "Invalid amount".to_string(),
    })?;
    let fee: u64 = args.fee.unwrap_or(candid::Nat::from(TRANSFER_FEE)).0.try_into().map_err(|_| TransferError::GenericError {
        error_code: candid::Nat::from(1u64),
        message: "Invalid fee".to_string(),
    })?;

    if balance < amount + fee {
        return Err(TransferError::InsufficientFunds {
            balance: candid::Nat::from(balance),
        });
    }

    // Perform mutations in a single mutable borrow
    BALANCES.with(|b| {
        let mut balances = b.borrow_mut();
        let new_balance = balance - (amount + fee);
        balances.insert(ic_cdk::api::id(), new_balance);
        balances.insert(args.to.owner, recipient_balance + amount);
    });

    Ok(candid::Nat::from(123456u64)) // Simulate block height
}

// Mock ICRC-1 balance_of function for testing
async fn icrc1_balance_of(account: Account) -> Result<u64, String> {
    Ok(BALANCES.with(|b| b.borrow().get(&account.owner).unwrap_or(0)))
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
    pub transfer_block_height: Option<candid::Nat>,
}

#[derive(CandidType, Deserialize, PartialEq, Clone)]
pub enum LoanStatus {
    Pending,
    Approved,
    Active,
    Repaid,
    Defaulted,
    Rejected,
    TransferPending,
    TransferFailed,
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

// Implement Storable for Loan
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
            LoanStatus::TransferPending => bytes.push(6),
            LoanStatus::TransferFailed => bytes.push(7),
        }
        
        if let Some(ref block_height) = self.transfer_block_height {
            bytes.push(1);
            let block_bytes = block_height.0.to_bytes_le();
            bytes.extend_from_slice(&(block_bytes.len() as u32).to_le_bytes());
            bytes.extend_from_slice(&block_bytes);
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
            6 => LoanStatus::TransferPending,
            7 => LoanStatus::TransferFailed,
            _ => LoanStatus::Pending,
        };
        pos += 1;
        
        let transfer_block_height = if bytes[pos] == 1 {
            pos += 1;
            let len = u32::from_le_bytes(bytes[pos..pos+4].try_into().unwrap()) as usize;
            pos += 4;
            let block_bytes = &bytes[pos..pos+len];
            Some(candid::Nat(BigUint::from_bytes_le(block_bytes)))
        } else {
            None
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
            transfer_block_height,
        }
    }

    fn into_bytes(self) -> Vec<u8> {
        self.to_bytes().into_owned()
    }

    const BOUND: Bound = Bound::Bounded {
        max_size: 1524,
        is_fixed_size: false,
    };
}

// Storable implementation for Document
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
        let owner_bytes = self.owner.as_slice();
        bytes.push(owner_bytes.len() as u8);
        bytes.extend_from_slice(owner_bytes);
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
        
        let check_bounds = |pos: usize, needed: usize, total: usize| -> Result<(), String> {
            if pos + needed > total {
                return Err(format!(
                    "Buffer underrun: need {} bytes at position {}, but only {} bytes total", 
                    needed, pos, total
                ));
            }
            Ok(())
        };
        
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
        
        check_bounds(pos, 8, bytes.len()).expect("Value USD bounds check failed");
        let value_usd = u64::from_le_bytes(
            bytes[pos..pos+8].try_into().expect("Failed to parse value_usd")
        );
        pos += 8;
        
        check_bounds(pos, 8, bytes.len()).expect("Created at bounds check failed");
        let created_at = u64::from_le_bytes(
            bytes[pos..pos+8].try_into().expect("Failed to parse created_at")
        );
        pos += 8;
        
        check_bounds(pos, 1, bytes.len()).expect("Principal length bounds check failed");
        let principal_len = bytes[pos] as usize;
        pos += 1;
        
        check_bounds(pos, principal_len, bytes.len()).expect("Principal data bounds check failed");
        let owner = Principal::from_slice(&bytes[pos..pos+principal_len]);
        pos += principal_len;
        
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

// Storable implementation for AcidValidation
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

// Storable implementation for CargoXMapping
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

// Storable implementation for CustomsVerification
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

// Updated loan approval function with ICRC-1 transfer
#[update]
pub async fn approve_loan(loan_id: String) -> Result<(), String> {
    let loan = LOANS.with(|loans| {
        let mut loans = loans.borrow_mut();
        if let Some(mut loan) = loans.get(&loan_id) {
            if loan.status != LoanStatus::Pending {
                return Err("Can only approve pending loans.".to_string());
            }
            loan.status = LoanStatus::TransferPending;
            loans.insert(loan_id.clone(), loan.clone());
            Ok(loan)
        } else {
            Err("Loan not found.".to_string())
        }
    })?;

    let token_amount = usd_to_tokens(loan.amount);
    
    let transfer_args = TransferArgs {
        from_subaccount: None,
        to: Account {
            owner: loan.borrower,
            subaccount: None,
        },
        amount: candid::Nat::from(token_amount),
        fee: Some(candid::Nat::from(TRANSFER_FEE)),
        memo: Some(format!("Loan approval: {}", loan_id).as_bytes().to_vec()),
        created_at_time: Some(ic_cdk::api::time()),
    };

    match icrc1_transfer(transfer_args).await {
        Ok(block_height) => {
            LOANS.with(|loans| {
                let mut loans = loans.borrow_mut();
                if let Some(mut loan) = loans.get(&loan_id) {
                    loan.status = LoanStatus::Active;
                    loan.transfer_block_height = Some(block_height.clone());
                    loans.insert(loan_id.clone(), loan);
                }
            });
            
            ic_cdk::println!("Loan {} approved and {} TCIP transferred to user. Block: {:?}", 
                loan_id, token_amount, block_height);
            
            Ok(())
        },
        Err(transfer_error) => {
            LOANS.with(|loans| {
                let mut loans = loans.borrow_mut();
                if let Some(mut loan) = loans.get(&loan_id) {
                    loan.status = LoanStatus::TransferFailed;
                    loans.insert(loan_id.clone(), loan);
                }
            });
            
            Err(format!("Transfer failed: {:?}", transfer_error))
        }
    }
}

// Get user's ICRC-1 wallet balance
#[update]
pub async fn get_wallet_balance_async() -> Result<u64, String> {
    let caller = caller();
    let account = Account {
        owner: caller,
        subaccount: None,
    };
    
    match icrc1_balance_of(account).await {
        Ok(balance) => Ok(balance),
        Err(e) => Err(format!("Failed to get wallet balance: {}", e)),
    }
}

// Convert token balance to USD for display
#[update]
pub async fn get_wallet_balance_usd() -> Result<u64, String> {
    let balance_tokens = get_wallet_balance_async().await?;
    Ok(tokens_to_usd(balance_tokens))
}

// Get active loan for a user
#[query]
pub fn get_active_loan() -> Option<Loan> {
    let caller = caller();
    LOANS.with(|loans| {
        loans.borrow()
            .iter()
            .find(|entry| {
                entry.value().borrower == caller && 
                matches!(entry.value().status, 
                    LoanStatus::Active | LoanStatus::TransferPending | LoanStatus::TransferFailed)
            })
            .map(|entry| entry.value().clone())
    })
}

// Retry failed transfer for a loan
#[update]
pub async fn retry_loan_transfer(loan_id: String) -> Result<(), String> {
    let loan = LOANS.with(|loans| {
        let loans = loans.borrow();
        loans.get(&loan_id)
    }).ok_or("Loan not found")?;

    if loan.status != LoanStatus::TransferFailed {
        return Err("Can only retry failed transfers".to_string());
    }

    LOANS.with(|loans| {
        let mut loans = loans.borrow_mut();
        if let Some(mut loan) = loans.get(&loan_id) {
            loan.status = LoanStatus::Pending;
            loans.insert(loan_id.clone(), loan);
        }
    });

    approve_loan(loan_id).await
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

// Consolidated upgrade functions
#[pre_upgrade]
fn pre_upgrade() {
    ic_cdk::println!("Preparing for upgrade...");
    use ic_cdk::storage;
    let principals = login::save_principals_state();
    storage::stable_save((principals,)).unwrap();
    ic_cdk::println!("Upgrade preparation complete");
}

#[post_upgrade]
fn post_upgrade() {
    ic_cdk::println!("Restoring state after upgrade...");
    use ic_cdk::storage;
    use std::collections::BTreeSet;
    use candid::Principal;
    let (saved_principals,): (BTreeSet<Principal>,) = storage::stable_restore().unwrap();
    login::restore_principals_state(saved_principals);
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
        transfer_block_height: None,
    };
    
    LOANS.with(|loans| {
        loans.borrow_mut().insert(loan_id.clone(), loan);
    });
    
    Ok(loan_id)
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

// Customs Integration Functions
#[update]
pub fn link_cargox_to_acid(nft_hash: String, acid_number: String) -> Result<String, String> {
    let acid_validation = validate_acid(acid_number.clone())?;
    if !acid_validation {
        return Err("Invalid ACID number.".to_string());
    }
    if CARGOX_MAPPINGS.with(|mappings| mappings.borrow().get(&nft_hash).is_some()) {
        return Err("CargoX NFT hash already linked to an ACID number.".to_string());
    }
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

#[update]
pub fn verify_customs_entry(nft_hash: String) -> Result<(), String> {
    let _mapping = CARGOX_MAPPINGS.with(|mappings| {
        mappings.borrow().get(&nft_hash)
    }).ok_or("CargoX mapping not found")?;
    CARGOX_MAPPINGS.with(|mappings| {
        let mut mappings = mappings.borrow_mut();
        if let Some(mut mapping) = mappings.get(&nft_hash) {
            mapping.verified = true;
            mappings.insert(nft_hash.clone(), mapping);
        }
    });
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
    match document.status {
        DocumentStatus::Verified => {
            DOCUMENTS.with(|documents| {
                let mut documents = documents.borrow_mut();
                if let Some(mut doc) = documents.get(&document_id) {
                    doc.status = DocumentStatus::NftMinted;
                    documents.insert(document_id.clone(), doc);
                }
            });
            ic_cdk::println!("Triggering lending for document: {}", document_id);
            Ok(())
        },
        DocumentStatus::NftMinted => {
            Ok(())
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

export_candid!();