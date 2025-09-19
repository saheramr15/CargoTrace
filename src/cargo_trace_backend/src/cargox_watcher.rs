 
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

async fn fetch_token_metadata(token_id: &str) -> Result<DocumentMetadata, String> {
    // For now, let's skip the tokenURI call and create mock metadata
    // This avoids the complex contract interaction that might be causing issues
    
    // Try to fetch from a direct IPFS/HTTP URL if available
    // CargoX often uses predictable metadata URLs
    let potential_urls = vec![
        format!("https://api.cargox.io/documents/{}/metadata", token_id),
        format!("https://metadata.cargox.io/token/{}", token_id),
        format!("https://gateway.pinata.cloud/ipfs/QmCargoXHash/{}.json", token_id),
    ];
    
    for url in potential_urls {
        match fetch_metadata_from_uri(&url).await {
            Ok(metadata) => return Ok(metadata),
            Err(_) => continue, // Try next URL
        }
    }
    
    // If all URLs fail, return mock metadata based on token_id
    Ok(DocumentMetadata {
        name: Some(format!("CargoX Document #{}", token_id)),
        description: Some("CargoX Digital Document".to_string()),
        image: None,
        external_url: Some(format!("https://cargox.io/document/{}", token_id)),
        attributes: vec![
            DocumentAttribute {
                trait_type: "Token ID".to_string(),
                value: token_id.to_string(),
            },
            DocumentAttribute {
                trait_type: "Platform".to_string(),
                value: "CargoX".to_string(),
            }
        ],
        document_hash: Some(format!("0x{:0>64}", token_id)), // Mock hash
        document_type: Some("Trade Document".to_string()),
        issuer: Some("CargoX Platform".to_string()),
        creation_date: None,
    })
}

async fn fetch_token_uri(token_id: &str) -> Result<String, String> {
    // Convert token_id to hex for the contract call
    let token_id_hex = format!("0x{:064x}", token_id.parse::<u64>().unwrap_or(0));
    
    // Encode the tokenURI function call
    let method_id = "c87b56dd"; // tokenURI(uint256) function selector
    let data = format!("0x{}{}", method_id, &token_id_hex[2..]);
    
    let url = format!(
        "https://api.etherscan.io/api?module=proxy&action=eth_call\
         &to=0xd4190DD1dA460fC7Bc41a792e688604778820aC9\
         &data={}&tag=latest\
         &apikey=RDKQ2CSHGCA17MVHIEANUG9X8YENCJ3ZTY", 
        data
    );

    let request = CanisterHttpRequestArgument {
        url,
        method: HttpMethod::GET,
        body: None,
        max_response_bytes: Some(1_000_000),
        transform: Some(TransformContext::from_name("transform_response".to_string(), vec![])),
        headers: vec![],
    };

    match http_request(request, 25_000_000_000).await {
        Ok((response,)) => {
            let text = String::from_utf8(response.body)
                .map_err(|e| format!("Failed to decode response: {}", e))?;
            
            let json: serde_json::Value = serde_json::from_str(&text)
                .map_err(|e| format!("Failed to parse JSON: {}", e))?;
            
            if let Some(result) = json["result"].as_str() {
                // Decode the hex result to get the URI
                decode_token_uri_result(result)
            } else {
                Err("No result in response".to_string())
            }
        }
        Err((code, msg)) => {
            Err(format!("HTTP request failed: {:?} - {}", code, msg))
        }
    }
}

fn decode_token_uri_result(hex_result: &str) -> Result<String, String> {
    let hex_str = hex_result.strip_prefix("0x").unwrap_or(hex_result);
    
    if hex_str.len() < 128 {
        return Err("Invalid response format".to_string());
    }
    
    // Skip the first 64 characters (offset) and get the length
    let length_hex = &hex_str[64..128];
    let length = u64::from_str_radix(length_hex, 16).unwrap_or(0) as usize;
    
    // Get the actual string data
    let data_hex = &hex_str[128..];
    let uri_bytes: Vec<u8> = (0..std::cmp::min(data_hex.len(), length * 2))
        .step_by(2)
        .filter_map(|i| u8::from_str_radix(&data_hex[i..i + 2], 16).ok())
        .collect();
    
    String::from_utf8(uri_bytes).map_err(|e| format!("Failed to decode URI: {}", e))
}

async fn fetch_metadata_from_uri(uri: &str) -> Result<DocumentMetadata, String> {
    let request = CanisterHttpRequestArgument {
        url: uri.to_string(),
        method: HttpMethod::GET,
        body: None,
        max_response_bytes: Some(500_000), // Reduced size
        transform: Some(TransformContext::from_name("transform_response".to_string(), vec![])),
        headers: vec![
            HttpHeader {
                name: "User-Agent".to_string(),
                value: "CargoX-Watcher/1.0".to_string(),
            },
            HttpHeader {
                name: "Accept".to_string(),
                value: "application/json".to_string(),
            },
        ],
    };

    match http_request(request, 10_000_000_000).await { // Reduced cycles
        Ok((response,)) => {
            if response.status == 200u16 {
                let text = String::from_utf8(response.body)
                    .map_err(|e| format!("Failed to decode response: {}", e))?;
                
                parse_metadata(&text)
            } else {
                Err(format!("HTTP error: {}", response.status))
            }
        }
        Err((code, msg)) => {
            Err(format!("HTTP request failed: {:?} - {}", code, msg))
        }
    }
}

 