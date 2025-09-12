use candid::{CandidType, Deserialize, Nat};
use ic_cdk::export::candid::Principal;
use ic_cdk::api::call::call;
use ic_cdk_macros::{init, update, query};
use ic_ledger_types::{AccountIdentifier, TransferArgs, Tokens, DEFAULT_SUBACCOUNT};
use serde::Serialize;
use std::cell::RefCell;
use std::collections::BTreeMap;

const LEDGER_CANISTER_ID: Principal = Principal::from_text("ulvla-h7777-77774-qaacq-cai").unwrap();

#[derive(CandidType, Deserialize, Clone, Debug, Serialize)]
pub enum LoanStatus {
    Pending,
    Approved,
    Active,
    Repaid,
    Defaulted,
    Rejected,
}

#[derive(CandidType, Deserialize, Clone, Debug, Serialize)]
pub enum DocumentStatus {
    Pending,
    Approved,
    Rejected,
}

#[derive(CandidType, Deserialize, Clone, Debug, Serialize)]
pub struct Document {
    pub id: String,
    pub owner: Principal,
    pub filename: String,
    pub content_type: String,
    pub file_data: Vec<u8>, // Store PDF data
    pub uploaded_at: u64,
    pub status: DocumentStatus,
    pub reviewed_at: Option<u64>,
    pub reviewer_notes: Option<String>,
}

#[derive(CandidType, Deserialize, Clone, Debug, Serialize)]
pub struct Loan {
    pub id: String,
    pub borrower: Principal,
    pub document_id: String,
    pub amount: u64,           // Changed from amount_e8s
    pub interest_rate: f64,    // Changed from interest_rate_bps to percentage
    pub created_at: u64,
    pub repayment_date: u64,   // Changed from repayment_timestamp
    pub status: LoanStatus,
    pub repayments: Vec<Repayment>,
}

#[derive(CandidType, Deserialize, Clone, Debug, Serialize)]
pub struct Repayment {
    pub payer: Principal,
    pub amount_e8s: u128,
    pub ts: u64,
    pub note: Option<String>,
}

#[derive(CandidType, Deserialize, Clone, Debug, Serialize)]
pub struct LoanApplication {
    pub document_id: String,
    pub amount: u64,
    pub interest_rate: f64,
    pub repayment_date: u64,
}

thread_local! {
    static LOANS: RefCell<BTreeMap<String, Loan>> = RefCell::new(BTreeMap::new());
    static DOCUMENTS: RefCell<BTreeMap<String, Document>> = RefCell::new(BTreeMap::new());
    static LOAN_COUNTER: RefCell<u64> = RefCell::new(0);
    static DOC_COUNTER: RefCell<u64> = RefCell::new(0);
}

#[init]
fn init() {
    // Initialize counters
}

fn generate_loan_id() -> String {
    LOAN_COUNTER.with(|c| {
        let mut counter = c.borrow_mut();
        *counter += 1;
        format!("LOAN_{:06}", *counter)
    })
}

fn generate_doc_id() -> String {
    DOC_COUNTER.with(|c| {
        let mut counter = c.borrow_mut();
        *counter += 1;
        format!("DOC_{:06}", *counter)
    })
}

fn account_identifier_of_principal(p: &Principal) -> AccountIdentifier {
    AccountIdentifier::new(*p, None)
}

// Document Management Functions
#[update]
fn upload_document(filename: String, content_type: String, file_data: Vec<u8>) -> Result<String, String> {
    let caller = ic_cdk::caller();
    let doc_id = generate_doc_id();
    let now = ic_cdk::api::time();
    
    let document = Document {
        id: doc_id.clone(),
        owner: caller,
        filename,
        content_type,
        file_data,
        uploaded_at: now,
        status: DocumentStatus::Pending,
        reviewed_at: None,
        reviewer_notes: None,
    };
    
    DOCUMENTS.with(|d| {
        d.borrow_mut().insert(doc_id.clone(), document);
    });
    
    Ok(doc_id)
}

#[query]
fn get_my_documents() -> Vec<Document> {
    let caller = ic_cdk::caller();
    DOCUMENTS.with(|d| {
        d.borrow()
            .values()
            .filter(|doc| doc.owner == caller)
            .cloned()
            .collect()
    })
}

#[query]
fn get_approved_documents() -> Vec<Document> {
    let caller = ic_cdk::caller();
    DOCUMENTS.with(|d| {
        d.borrow()
            .values()
            .filter(|doc| doc.owner == caller && matches!(doc.status, DocumentStatus::Approved))
            .cloned()
            .collect()
    })
}

#[query]
fn get_all_documents() -> Vec<Document> {
    DOCUMENTS.with(|d| d.borrow().values().cloned().collect())
}

#[update]
fn approve_document(doc_id: String, notes: Option<String>) -> Result<String, String> {
    let now = ic_cdk::api::time();
    
    DOCUMENTS.with(|d| {
        let mut docs = d.borrow_mut();
        match docs.get_mut(&doc_id) {
            Some(doc) => {
                doc.status = DocumentStatus::Approved;
                doc.reviewed_at = Some(now);
                doc.reviewer_notes = notes;
                Ok("Document approved".to_string())
            }
            None => Err("Document not found".to_string())
        }
    })
}

#[update]
fn reject_document(doc_id: String, notes: Option<String>) -> Result<String, String> {
    let now = ic_cdk::api::time();
    
    DOCUMENTS.with(|d| {
        let mut docs = d.borrow_mut();
        match docs.get_mut(&doc_id) {
            Some(doc) => {
                doc.status = DocumentStatus::Rejected;
                doc.reviewed_at = Some(now);
                doc.reviewer_notes = notes;
                Ok("Document rejected".to_string())
            }
            None => Err("Document not found".to_string())
        }
    })
}

// Loan Management Functions
#[update]
fn submit_loan_application(application: LoanApplication) -> Result<String, String> {
    let caller = ic_cdk::caller();
    let loan_id = generate_loan_id();
    let now = ic_cdk::api::time();
    
    // Verify document exists and is approved
    let doc_approved = DOCUMENTS.with(|d| {
        d.borrow()
            .get(&application.document_id)
            .map(|doc| doc.owner == caller && matches!(doc.status, DocumentStatus::Approved))
            .unwrap_or(false)
    });
    
    if !doc_approved {
        return Err("Document not found or not approved".to_string());
    }
    
    let loan = Loan {
        id: loan_id.clone(),
        borrower: caller,
        document_id: application.document_id,
        amount: application.amount,
        interest_rate: application.interest_rate,
        created_at: now,
        repayment_date: application.repayment_date,
        status: LoanStatus::Pending,
        repayments: vec![],
    };
    
    LOANS.with(|l| {
        l.borrow_mut().insert(loan_id.clone(), loan);
    });
    
    Ok(loan_id)
}

#[query]
fn get_my_loans() -> Vec<Loan> {
    let caller = ic_cdk::caller();
    LOANS.with(|l| {
        l.borrow()
            .values()
            .filter(|loan| loan.borrower == caller)
            .cloned()
            .collect()
    })
}

#[query]
fn get_all_loans() -> Vec<Loan> {
    LOANS.with(|l| l.borrow().values().cloned().collect())
}

#[query]
fn get_loan(loan_id: String) -> Option<Loan> {
    LOANS.with(|l| l.borrow().get(&loan_id).cloned())
}

#[update]
async fn approve_loan(loan_id: String) -> Result<String, String> {
    let maybe = LOANS.with(|l| l.borrow().get(&loan_id).cloned());
    let mut loan = match maybe {
        Some(l) => l,
        None => return Err("Loan not found".into()),
    };

    match loan.status {
        LoanStatus::Pending => {},
        _ => return Err("Loan must be Pending to approve".into()),
    }

    // Convert amount to e8s for ledger transfer
    let amount_e8s = loan.amount * 100_000_000; // Assuming 1 token = 100M e8s
    let to_account = account_identifier_of_principal(&loan.borrower);
    let amt = Tokens::from_e8s(amount_e8s);

    let transfer_args = TransferArgs {
        to: to_account,
        amount: amt,
        fee: None,
        memo: None,
        from_subaccount: None,
        created_at_time: None,
    };

    let args = candid::Encode!(&transfer_args).map_err(|e| format!("encode error: {:?}", e))?;
    let transfer_res = ic_cdk::api::call::call(LEDGER_CANISTER_ID, "icrc1_transfer", args).await;
    
    match transfer_res {
        Ok((res,)) => {
            loan.status = LoanStatus::Approved;
            LOANS.with(|l| {
                l.borrow_mut().insert(loan_id.clone(), loan.clone());
            });
            Ok(format!("Loan approved and transferred. Ledger returned: {:?}", res))
        }
        Err(e) => {
            Err(format!("Ledger transfer failed: {:?}", e))
        }
    }
}

#[update]
fn reject_loan(loan_id: String, reason: Option<String>) -> Result<String, String> {
    LOANS.with(|l| {
        let mut loans = l.borrow_mut();
        match loans.get_mut(&loan_id) {
            Some(loan) => {
                match loan.status {
                    LoanStatus::Pending => {
                        loan.status = LoanStatus::Rejected;
                        Ok("Loan rejected".to_string())
                    }
                    _ => Err("Loan must be Pending to reject".to_string())
                }
            }
            None => Err("Loan not found".to_string())
        }
    })
}

#[update]
fn record_repayment(loan_id: String, payer: Principal, amount_e8s: u128, note: Option<String>, ts: u64) -> Result<String, String> {
    let mut updated = false;
    LOANS.with(|l| {
        let mut map = l.borrow_mut();
        if let Some(loan) = map.get_mut(&loan_id) {
            loan.repayments.push(Repayment {
                payer,
                amount_e8s,
                ts,
                note,
            });
            let total_paid: u128 = loan.repayments.iter().map(|r| r.amount_e8s).sum();
            let amount_due = (loan.amount as u128) * 100_000_000; // Convert to e8s
            if total_paid >= amount_due {
                loan.status = LoanStatus::Repaid;
            }
            updated = true;
        }
    });
    if updated {
        Ok("Repayment recorded".to_string())
    } else {
        Err("Loan not found".to_string())
    }
}