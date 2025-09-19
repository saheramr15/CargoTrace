 
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

#[derive(CandidType, Deserialize, Clone, Debug, Serialize)]
pub struct DocumentAttribute {
    pub trait_type: String,
    pub value: String,
}

#[derive(CandidType, Deserialize, Clone, Debug, Serialize)]
pub struct CargoXDocument {
    pub token_id: String,
    pub owner: String,
    pub document_hash: String,
    pub document_type: String,
    pub metadata: DocumentMetadata,
    pub last_transfer: TransferEvent,
}

#[derive(CandidType, Deserialize)]
pub struct ApiResponse {
    pub status: String,
    pub message: String,
    pub result: Vec<LogEntry>,
}

#[derive(CandidType, Deserialize)]
pub struct LogEntry {
    #[serde(rename = "transactionHash")]
    pub transaction_hash: String,
    pub topics: Vec<String>,
    #[serde(rename = "blockNumber")]
    pub block_number: String,
}

#[init]
fn init() {
    ic_cdk::println!("CargoX Watcher Backend initialized");
}

#[update]
async fn fetch_transfers_with_metadata() -> Result<Vec<TransferEvent>, String> {
    let transfers = fetch_transfers().await?;
    let mut enhanced_transfers = Vec::new();
    
    for mut transfer in transfers {
        match fetch_token_metadata(&transfer.token_id).await {
            Ok(metadata) => {
                transfer.metadata = Some(metadata);
                enhanced_transfers.push(transfer);
            }
            Err(e) => {
                ic_cdk::println!("Failed to fetch metadata for token {}: {}", transfer.token_id, e);
                enhanced_transfers.push(transfer); // Add without metadata
            }
        }
    }
    
    Ok(enhanced_transfers)
}

#[update]
async fn fetch_cargox_documents() -> Result<Vec<CargoXDocument>, String> {
    // First get basic transfers without metadata to avoid too many HTTP calls
    let transfers = fetch_transfers().await?;
    let mut documents: HashMap<String, CargoXDocument> = HashMap::new();
    
    // Group transfers by token_id to get the latest owner
    let mut token_owners: HashMap<String, TransferEvent> = HashMap::new();
    for transfer in transfers {
        let token_id = transfer.token_id.clone();
        match token_owners.get(&token_id) {
            Some(existing) => {
                if transfer.block_number > existing.block_number {
                    token_owners.insert(token_id, transfer);
                }
            }
            None => {
                token_owners.insert(token_id, transfer);
            }
        }
    }
    
    // Now fetch metadata for unique tokens only (limit to first 5 to avoid cycle issues)
    let mut processed = 0;
    const MAX_TOKENS: usize = 5;
    
    for (token_id, latest_transfer) in token_owners {
        if processed >= MAX_TOKENS {
            break;
        }
        
        match fetch_token_metadata(&token_id).await {
            Ok(metadata) => {
                let document_hash = metadata.document_hash.clone().unwrap_or_default();
                let document_type = metadata.document_type.clone().unwrap_or("Unknown".to_string());
                
                let mut transfer_with_metadata = latest_transfer.clone();
                transfer_with_metadata.metadata = Some(metadata.clone());
                
                documents.insert(token_id.clone(), CargoXDocument {
                    token_id: token_id.clone(),
                    owner: latest_transfer.to.clone(),
                    document_hash,
                    document_type,
                    metadata,
                    last_transfer: transfer_with_metadata,
                });
            }
            Err(e) => {
                ic_cdk::println!("Failed to fetch metadata for token {}: {}", token_id, e);
                // Create document without metadata
                documents.insert(token_id.clone(), CargoXDocument {
                    token_id: token_id.clone(),
                    owner: latest_transfer.to.clone(),
                    document_hash: "Unknown".to_string(),
                    document_type: "Unknown".to_string(),
                    metadata: DocumentMetadata {
                        name: Some(format!("CargoX Token #{}", token_id)),
                        description: None,
                        image: None,
                        external_url: None,
                        attributes: vec![],
                        document_hash: None,
                        document_type: None,
                        issuer: None,
                        creation_date: None,
                    },
                    last_transfer: latest_transfer,
                });
            }
        }
        processed += 1;
    }
    
    Ok(documents.into_values().collect())
}

#[update]
async fn get_document_by_token_id(token_id: String) -> Result<Option<CargoXDocument>, String> {
    let metadata = fetch_token_metadata(&token_id).await?;
    
    // Get the latest transfer for this token
    let transfers = fetch_transfers().await?;
    let latest_transfer = transfers
        .into_iter()
        .filter(|t| t.token_id == token_id)
        .max_by_key(|t| t.block_number);
    
    if let Some(transfer) = latest_transfer {
        let document_hash = metadata.document_hash.clone().unwrap_or_default();
        let document_type = metadata.document_type.clone().unwrap_or("Unknown".to_string());
        
        Ok(Some(CargoXDocument {
            token_id: token_id.clone(),
            owner: transfer.to.clone(),
            document_hash,
            document_type,
            metadata,
            last_transfer: transfer,
        }))
    } else {
        Ok(None)
    }
}

 
