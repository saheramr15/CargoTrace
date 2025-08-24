use candid::{CandidType, Deserialize};
use ic_cdk_macros::{update, query};
use std::cell::RefCell;

// ---- Payload Structure ----
#[derive(Clone, Debug, CandidType, Deserialize)]
pub struct TransferPayload {
    pub network: String,
    pub contract: String,
    pub tx_hash: String,
    pub block_number: u64,
    pub token_id: String,
    pub from: String,
    pub to: String,
    pub log_index: u64,
}

// ---- Storage ----
thread_local! {
    static TRANSFERS: RefCell<Vec<TransferPayload>> = RefCell::new(Vec::new());
}

// ---- Update method: ingest transfer from JS watcher ----
#[update]
pub fn ingest_transfer(payload: TransferPayload) {
    TRANSFERS.with(|t| t.borrow_mut().push(payload));
}

// ---- Query method: get all transfers ----
#[query]
pub fn get_transfers() -> Vec<TransferPayload> {
    TRANSFERS.with(|t| t.borrow().clone())
}
