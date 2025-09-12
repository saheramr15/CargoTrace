use candid::{CandidType, Deserialize, Nat};
use ic_cdk::export::candid::Principal;
use ic_cdk::api::call::call;
use ic_cdk_macros::{init, update, query};
use ic_ledger_types::{AccountIdentifier, TransferArgs, Tokens, DEFAULT_SUBACCOUNT};
use serde::Serialize;
use std::cell::RefCell;
use std::collections::BTreeMap;

/// our ledger canister principal
const LEDGER_CANISTER_ID: Principal = Principal::from_text("ulvla-h7777-77774-qaacq-cai").unwrap();

#[derive(CandidType, Deserialize, Clone, Debug, Serialize)]
pub enum LoanStatus {
    Pending,
    Approved,
    Active,
    Repaid,
    Defaulted,


}#[derive(CandidType, Deserialize, Clone, Debug, Serialize)]
pub struct Loan {
    pub id: String,                     // Unique loan identifier
    pub borrower: Principal,            // The borrower’s principal (from Internet Identity)
    pub document_id: String,            // Link or ID for verification docs
    pub amount_e8s: u64,                // Loan amount in e8s (1 TICP = 100_000_000 e8s)
    pub interest_rate_bps: u32,         // Interest in basis points (e.g. 250 = 2.5%)
    pub created_at: u64,                // Unix timestamp (seconds)
    pub repayment_timestamp: Option<u64>, // Due date (seconds since epoch)
    pub status: LoanStatus,             // Current loan status (enum)
    pub repayments: Vec<Repayment>,     // History of repayments
}


#[derive(CandidType, Deserialize, Clone, Debug, Serialize)]
pub struct Repayment {
    pub payer: Principal,
    pub amount_e8s: u128,
    pub ts: u64,
    pub note: Option<String>,
}

/// Simple in-memory (stable) storage for loans; in production use stable structures
thread_local! {
    static LOANS: RefCell<BTreeMap<String, Loan>> = RefCell::new(BTreeMap::new());
}

#[init]
fn init() {
    // Optionally initialize something
}

/// Utility: convert Principal to AccountIdentifier (ICRC account)
fn account_identifier_of_principal(p: &Principal) -> AccountIdentifier {
    // A canonical account uses principal + subaccount (here None / default)
    AccountIdentifier::new(*p, None)
}

#[query]
fn get_my_loans() -> Vec<Loan> {
    LOANS.with(|m| m.borrow().values().cloned().collect())
}

#[query]
fn get_loan(loan_id: String) -> Option<Loan> {
    LOANS.with(|m| m.borrow().get(&loan_id).cloned())
}

/// Admin-only / operator-only in production: approve loan and transfer tokens to borrower.
/// This function:
/// 1) checks loan is Pending
/// 2) set status to Approved -> Active
/// 3) calls the ledger's `icrc1_transfer` via the ic_cdk inter-canister call helper (ic_ledger_types::transfer wrapper)
#[update]
async fn approve_loan(loan_id: String) -> Result<String, String> {
    // 1 - fetch and validate loan
    let maybe = LOANS.with(|m| m.borrow().get(&loan_id).cloned());
    let mut loan = match maybe {
        Some(l) => l,
        None => return Err("Loan not found".into()),
    };

    match loan.status {
        LoanStatus::Pending => {},
        _ => return Err("Loan must be Pending to approve".into()),
    }

    // 2 - prepare transfer args (transfer from this canister's account to borrower)
    let to_account = account_identifier_of_principal(&loan.borrower);
    // amount in Tokens type (ic_ledger_types::Tokens)
    let amt = Tokens::from_e8s(loan.amount_e8s); // adapt if your token decimals differ

    let transfer_args = TransferArgs {
        to: to_account,
        amount: amt,
        fee: None,
        memo: None,
        from_subaccount: None,
        created_at_time: None,
    };

    // 3 - call the ledger canister transfer method
    // Use bounded wait (best-effort) pattern to avoid indefinite hanging; here we use a basic inter-canister call:
    let ledger_canister = LEDGER_CANISTER_ID;
    // The `transfer` helper (from ic_ledger_types) will do the inter-canister call for you:
    // This returns a Result<BlockIndex, CallError> or similar. We'll use the low-level call instead for clarity.

    // Build candid encoded args for icrc1_transfer
    // Transfer method signature: icrc1_transfer : (record { to : account; amount : nat; ...}) -> (record { block_index: nat });
    // We'll call it directly:
    let args = candid::Encode!(&transfer_args).map_err(|e| format!("encode error: {:?}", e))?;

    let transfer_res = ic_cdk::api::call::call(ledger_canister, "icrc1_transfer", args).await;
    match transfer_res {
        Ok((res,)) => {
            // success: mark loan as active and store
            loan.status = LoanStatus::Active;
            LOANS.with(|m| {
                m.borrow_mut().insert(loan_id.clone(), loan.clone());
            });
            // return success (you might encode/reserialize ledger response here)
            Ok(format!("Loan approved and transferred. Ledger returned: {:?}", res))
        }
        Err(e) => {
            Err(format!("Ledger transfer failed: {:?}", e))
        }
    }
}

/// Record a repayment (this is a simple RPC endpoint that your frontend can call after transfer),
/// or you can implement ledger-monitor-to-detect-incoming-transfers and call this internally.
/// `amount_e8s` is the raw smallest unit like e8s.
#[update]
fn record_repayment(loan_id: String, payer: Principal, amount_e8s: u128, note: Option<String>, ts: u64) -> Result<String, String> {
    let mut updated = false;
    LOANS.with(|m| {
        let mut map = m.borrow_mut();
        if let Some(loan) = map.get_mut(&loan_id) {
            loan.repayments.push(Repayment {
                payer,
                amount_e8s,
                ts,
                note,
            });
            // sum repayments and possibly mark as Repaid
            let total_paid: u128 = loan.repayments.iter().map(|r| r.amount_e8s).sum();
            let amount_due = loan.amount_e8s; // ignoring interest calc for demo
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

/// Admin helper to create a loan (for testing)
#[update]
fn create_loan(id: String, borrower: Principal, document_id: String, amount_e8s: u128, interest_bps: u32, created_at: u64, repayment_ts: Option<u64>) -> Result<String, String> {
    let loan = Loan {
        id: id.clone(),
        borrower,
        document_id,
        amount_e8s,
        interest_rate_bps: interest_bps,
        created_at,
        repayment_timestamp: repayment_ts,
        status: LoanStatus::Pending,
        repayments: vec![],
    };
    LOANS.with(|m| { m.borrow_mut().insert(id.clone(), loan); });
    Ok("Loan created".into())
}
