 
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

#[derive(CandidType, Deserialize, Clone, Debug, Serialize)]
pub struct DocumentMetadata {
    pub name: Option<String>,
    pub description: Option<String>,
    pub image: Option<String>,
    pub external_url: Option<String>,
    pub attributes: Vec<DocumentAttribute>,
    pub document_hash: Option<String>,
    pub document_type: Option<String>,
    pub issuer: Option<String>,
    pub creation_date: Option<String>,
}

