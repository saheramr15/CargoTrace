 
use candid::{CandidType, Deserialize};
use ic_cdk::api::management_canister::http_request::{
    http_request, CanisterHttpRequestArgument, HttpMethod, HttpResponse, TransformContext, HttpHeader
};
use ic_cdk_macros::{update, query, init};
use serde::Serialize;
use std::collections::HashMap;

#[derive(CandidType, Deserialize, Clone, Debug, Serialize)]
pub struct TransferEvent {
    pub tx_hash: String,
    pub from: String,
    pub to: String,
    pub token_id: String,
    pub block_number: u64,
    pub metadata: Option<DocumentMetadata>,
}
 