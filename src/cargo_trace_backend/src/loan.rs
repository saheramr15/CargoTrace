use candid::{CandidType, Deserialize, Principal};
use ic_cdk::api::call::call;
use ic_cdk_macros::{init, update};
use ic_ledger_types::{AccountIdentifier, Memo, Subaccount, Tokens, TransferArgs, DEFAULT_FEE};
use serde::Serialize;
use std::cell::RefCell;
use std::collections::BTreeMap;

// ================= Ledger =================

fn ledger_canister_id() -> Principal {
    Principal::from_text("ulvla-h7777-77774-qaacq-cai").unwrap()
}

fn account_identifier_of_principal(p: &Principal) -> AccountIdentifier {
    AccountIdentifier::new(p, &Subaccount([0u8; 32]))
}

// ================= Loan / Document Models =================

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
    pub file_data: Vec<u8>,
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
    pub amount: u64,
    pub interest_rate: f64,
    pub created_at: u64,
    pub repayment_date: u64,
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

// ================= Storage =================

thread_local! {
    static LOANS: RefCell<BTreeMap<String, Loan>> = RefCell::new(BTreeMap::new());
    static DOCUMENTS: RefCell<BTreeMap<String, Document>> = RefCell::new(BTreeMap::new());
    static LOAN_COUNTER: RefCell<u64> = RefCell::new(0);
    static DOC_COUNTER: RefCell<u64> = RefCell::new(0);
}

#[init]
fn init() {}

// ================= Helpers =================

// fn generate_loan_id() -> String {
//     LOAN_COUNTER.with(|c| {
//         let mut counter = c.borrow_mut();
//         *counter += 1;
//         format!("LOAN_{:06}", *counter)
//     })
// }

// fn generate_doc_id() -> String {
//     DOC_COUNTER.with(|c| {
//         let mut counter = c.borrow_mut();
//         *counter += 1;
//         format!("DOC_{:06}", *counter)
//     })
// }

// ================= Loan Management =================

#[update]
async fn approve_loan2(loan_id: String) -> Result<String, String> {
    let maybe = LOANS.with(|l| l.borrow().get(&loan_id).cloned());
    let mut loan = match maybe {
        Some(l) => l,
        None => return Err("Loan not found".into()),
    };

    if !matches!(loan.status, LoanStatus::Pending) {
        return Err("Loan must be Pending to approve".into());
    }

    let amount_e8s = loan.amount * 100_000_000;
    let to_account = account_identifier_of_principal(&loan.borrower);
    let amt = Tokens::from_e8s(amount_e8s);

    let transfer_args = TransferArgs {
        from_subaccount: None,
        to: to_account,
        fee: DEFAULT_FEE,
        memo: Memo(0),
        created_at_time: None,
        amount: amt,
    };

    let transfer_res: Result<(Result<Tokens, String>,), _> =
        call(ledger_canister_id(), "icrc1_transfer", (transfer_args,)).await;

    match transfer_res {
        Ok((res,)) => {
            loan.status = LoanStatus::Approved;
            LOANS.with(|l| {
                l.borrow_mut().insert(loan_id.clone(), loan.clone());
            });
            Ok(format!("Loan approved and transferred. Ledger returned: {:?}", res))
        }
        Err(e) => Err(format!("Ledger transfer failed: {:?}", e)),
    }
}
