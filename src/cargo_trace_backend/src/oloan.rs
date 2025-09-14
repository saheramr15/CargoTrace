// use candid::{CandidType, Deserialize, Principal};
// use ic_cdk::api::call::call;
// use ic_cdk::caller;
// use ic_cdk_macros::{init, update, query, pre_upgrade, post_upgrade};
// use ic_ledger_types::{AccountIdentifier, Memo, Subaccount, Tokens, TransferArgs, DEFAULT_FEE};
// use ic_stable_structures::{BTreeMap as StableBTreeMap, DefaultMemoryImpl, StableBTreeMap};
// use ic_stable_structures::memory_manager::{MemoryId, MemoryManager, VirtualMemory};
// use serde::Serialize;
// use std::cell::RefCell;

// // ================= Memory Management =================

// type Memory = VirtualMemory<DefaultMemoryImpl>;

// thread_local! {
//     static MEMORY_MANAGER: RefCell<MemoryManager<DefaultMemoryImpl>> =
//         RefCell::new(MemoryManager::init(DefaultMemoryImpl::default()));

//     static LOANS: RefCell<StableBTreeMap<String, Loan, Memory>> = RefCell::new(
//         StableBTreeMap::init(
//             MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(0)))
//         )
//     );

//     static DOCUMENTS: RefCell<StableBTreeMap<String, Document, Memory>> = RefCell::new(
//         StableBTreeMap::init(
//             MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(1)))
//         )
//     );

//     static LOAN_COUNTER: RefCell<StableBTreeMap<u8, u64, Memory>> = RefCell::new(
//         StableBTreeMap::init(
//             MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(2)))
//         )
//     );

//     static DOC_COUNTER: RefCell<StableBTreeMap<u8, u64, Memory>> = RefCell::new(
//         StableBTreeMap::init(
//             MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(3)))
//         )
//     );
// }

// // ================= Ledger =================

// fn ledger_canister_id() -> Principal {
//     Principal::from_text("ulvla-h7777-77774-qaacq-cai").unwrap()
// }

// fn account_identifier_of_principal(p: &Principal) -> AccountIdentifier {
//     AccountIdentifier::new(p, &Subaccount([0u8; 32]))
// }

// // ================= Loan / Document Models =================

// #[derive(CandidType, Deserialize, Clone, Debug, Serialize)]
// pub enum LoanStatus {
//     Pending,
//     Approved,
//     Active,
//     Repaid,
//     Defaulted,
//     Rejected,
// }

// #[derive(CandidType, Deserialize, Clone, Debug, Serialize)]
// pub enum DocumentStatus {
//     Pending,
//     Approved,
//     Rejected,
//     NftMinted, // Added for frontend compatibility
// }

// #[derive(CandidType, Deserialize, Clone, Debug, Serialize)]
// pub struct Document {
//     pub id: String,
//     pub owner: Principal,
//     pub filename: String,
//     pub content_type: String,
//     pub file_data: Vec<u8>,
//     pub uploaded_at: u64,
//     pub status: DocumentStatus,
//     pub reviewed_at: Option<u64>,
//     pub reviewer_notes: Option<String>,
//     pub acid_number: String, // Added for frontend
//     pub value_usd: u64,      // Added for frontend
//     pub ethereum_tx_hash: Option<String>, // Added for frontend
//     pub created_at: u64,    // Added for frontend
// }

// #[derive(CandidType, Deserialize, Clone, Debug, Serialize)]
// pub struct Loan {
//     pub id: String,
//     pub borrower: Principal,
//     pub document_id: String,
//     pub amount: u64,
//     pub interest_rate: f64,
//     pub created_at: u64,
//     pub repayment_date: u64,
//     pub status: LoanStatus,
//     pub repayments: Vec<Repayment>,
// }

// #[derive(CandidType, Deserialize, Clone, Debug, Serialize)]
// pub struct Repayment {
//     pub payer: Principal,
//     pub amount_e8s: u128,
//     pub ts: u64,
//     pub note: Option<String>,
// }

// #[derive(CandidType, Deserialize, Clone, Debug, Serialize)]
// pub struct LoanApplication {
//     pub document_id: String,
//     pub amount: u64,
//     pub interest_rate: f64,
//     pub repayment_date: u64,
// }

// // ================= Lifecycle Hooks =================

// #[init]
// fn init() {
//     // Initialize counters if they don't exist
//     LOAN_COUNTER.with(|counter| {
//         if counter.borrow().get(&0).is_none() {
//             counter.borrow_mut().insert(0, 0);
//         }
//     });
    
//     DOC_COUNTER.with(|counter| {
//         if counter.borrow().get(&0).is_none() {
//             counter.borrow_mut().insert(0, 0);
//         }
//     });
// }

// #[pre_upgrade]
// fn pre_upgrade() {
//     // Stable structures automatically handle persistence
//     // No manual serialization needed
// }

// #[post_upgrade]
// fn post_upgrade() {
//     // Stable structures automatically handle restoration
//     // No manual deserialization needed
// }

// // ================= Helpers =================

// fn generate_loan_id() -> String {
//     LOAN_COUNTER.with(|c| {
//         let current = c.borrow().get(&0).unwrap_or(0);
//         let new_counter = current + 1;
//         c.borrow_mut().insert(0, new_counter);
//         format!("LOAN_{:06}", new_counter)
//     })
// }

// fn generate_doc_id() -> String {
//     DOC_COUNTER.with(|c| {
//         let current = c.borrow().get(&0).unwrap_or(0);
//         let new_counter = current + 1;
//         c.borrow_mut().insert(0, new_counter);
//         format!("DOC_{:06}", new_counter)
//     })
// }

// // ================= Loan Management =================

// #[update]
// async fn approve_loan2(loan_id: String) -> Result<String, String> {
//     let maybe_loan = LOANS.with(|l| l.borrow().get(&loan_id));
//     let mut loan = match maybe_loan {
//         Some(l) => l,
//         None => return Err("Loan not found".into()),
//     };

//     if !matches!(loan.status, LoanStatus::Pending) {
//         return Err("Loan must be Pending to approve".into());
//     }

//     let amount_e8s = loan.amount * 100_000_000;
//     let to_account = account_identifier_of_principal(&loan.borrower);
//     let amt = Tokens::from_e8s(amount_e8s);

//     let transfer_args = TransferArgs {
//         from_subaccount: None,
//         to: to_account,
//         fee: DEFAULT_FEE,
//         memo: Memo(0),
//         created_at_time: None,
//         amount: amt,
//     };

//     let transfer_res: Result<(Result<Tokens, String>,), _> =
//         call(ledger_canister_id(), "icrc1_transfer", (transfer_args,)).await;

//     match transfer_res {
//         Ok((res,)) => {
//             loan.status = LoanStatus::Active;
//             LOANS.with(|l| {
//                 l.borrow_mut().insert(loan_id.clone(), loan.clone());
//             });
//             Ok(format!("Loan approved and transferred. Ledger returned: {:?}", res))
//         }
//         Err(e) => Err(format!("Ledger transfer failed: {:?}", e)),
//     }
// }

// #[query]
// pub fn get_my_loans() -> Vec<Loan> {
//     let caller = caller();
//     LOANS.with(|l| {
//         l.borrow()
//             .iter()
//             .filter_map(|(_, loan)| {
//                 if loan.borrower == caller {
//                     Some(loan)
//                 } else {
//                     None
//                 }
//             })
//             .collect()
//     })
// }

// #[query]
// pub fn get_all_loans() -> Vec<Loan> {
//     // TODO: Add admin check if needed
//     LOANS.with(|l| {
//         l.borrow().iter().map(|(_, loan)| loan).collect()
//     })
// }

// #[update]
// async fn get_wallet_balance_async() -> Result<u64, String> {
//     let caller = caller();
//     let account = account_identifier_of_principal(&caller);
    
//     let balance_res: Result<(Tokens,), _> = 
//         call(ledger_canister_id(), "icrc1_balance_of", (account,)).await;
    
//     match balance_res {
//         Ok((balance,)) => Ok(balance.e8s()),
//         Err(e) => Err(format!("Failed to fetch balance: {:?}", e)),
//     }
// }

// #[query]
// pub fn get_active_loan() -> Option<Loan> {
//     let caller = caller();
//     LOANS.with(|l| {
//         l.borrow()
//             .iter()
//             .find(|(_, loan)| loan.borrower == caller && matches!(loan.status, LoanStatus::Active))
//             .map(|(_, loan)| loan)
//     })
// }

// #[update]
// async fn request_loan(application: LoanApplication) -> Result<String, String> {
//     let caller = caller();
    
//     // Validate document exists
//     let document_exists = DOCUMENTS.with(|docs| {
//         docs.borrow().get(&application.document_id).is_some()
//     });
//     if !document_exists {
//         return Err("Document not found".into());
//     }

//     // Validate amount and repayment date
//     if application.amount == 0 {
//         return Err("Loan amount must be greater than zero".into());
//     }
//     if application.repayment_date <= ic_cdk::api::time() {
//         return Err("Repayment date must be in the future".into());
//     }

//     let loan_id = generate_loan_id();
//     let loan = Loan {
//         id: loan_id.clone(),
//         borrower: caller,
//         document_id: application.document_id,
//         amount: application.amount,
//         interest_rate: application.interest_rate,
//         created_at: ic_cdk::api::time(),
//         repayment_date: application.repayment_date,
//         status: LoanStatus::Pending,
//         repayments: vec![],
//     };

//     LOANS.with(|loans| {
//         loans.borrow_mut().insert(loan_id.clone(), loan);
//     });

//     Ok(loan_id)
// }

// #[query]
// pub fn get_my_documents() -> Vec<Document> {
//     let caller = caller();
//     DOCUMENTS.with(|docs| {
//         docs.borrow()
//             .iter()
//             .filter_map(|(_, doc)| {
//                 if doc.owner == caller {
//                     Some(doc)
//                 } else {
//                     None
//                 }
//             })
//             .collect()
//     })
// }

// #[update]
// async fn upload_document(filename: String, content_type: String, file_data: Vec<u8>, acid_number: String, value_usd: u64) -> Result<String, String> {
//     let doc_id = generate_doc_id();
//     let document = Document {
//         id: doc_id.clone(),
//         owner: caller(),
//         filename,
//         content_type,
//         file_data,
//         uploaded_at: ic_cdk::api::time(),
//         status: DocumentStatus::Pending,
//         reviewed_at: None,
//         reviewer_notes: None,
//         acid_number,
//         value_usd,
//         ethereum_tx_hash: None,
//         created_at: ic_cdk::api::time(),
//     };
    
//     DOCUMENTS.with(|docs| {
//         docs.borrow_mut().insert(doc_id.clone(), document);
//     });
    
//     Ok(doc_id)
// }

// // Temporary function to add test documents (remove after testing)
// #[update]
// async fn add_test_document() -> String {
//     let caller = caller();
//     let doc_id = generate_doc_id();
//     let document = Document {
//         id: doc_id.clone(),
//         owner: caller,
//         filename: "test_document.pdf".to_string(),
//         content_type: "application/pdf".to_string(),
//         file_data: vec![],
//         uploaded_at: ic_cdk::api::time(),
//         status: DocumentStatus::NftMinted,
//         reviewed_at: Some(ic_cdk::api::time()),
//         reviewer_notes: None,
//         acid_number: format!("ACID_{:06}", DOC_COUNTER.with(|c| c.borrow().get(&0).unwrap_or(0))),
//         value_usd: 100000, // $100,000
//         ethereum_tx_hash: Some("0x1234567890abcdef".to_string()),
//         created_at: ic_cdk::api::time(),
//     };

//     DOCUMENTS.with(|docs| {
//         docs.borrow_mut().insert(doc_id.clone(), document);
//     });

//     format!("Created test document: {}", doc_id)
// }