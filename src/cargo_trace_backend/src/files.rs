use ic_cdk::api::time;
use candid::{CandidType, Deserialize}; // ✅ استخدم candid مباشرة بدل ic_cdk::export
use std::collections::HashMap;

#[derive(Clone, Debug, CandidType, Deserialize)] // ✅ ده اللي كان ناقص أو غلط import
pub struct Document {
    pub id: u64,
    pub name: String,
    pub content_hash: String,
    pub owner: String,
    pub receiver: Option<String>,
    pub uploaded_at: u64,
    pub transferred_at: Option<u64>,
}

thread_local! {
    static DOCS: std::cell::RefCell<HashMap<u64, Document>> = std::cell::RefCell::new(HashMap::new());
    static COUNTER: std::cell::RefCell<u64> = std::cell::RefCell::new(0);
}

// Upload document
#[ic_cdk::update]
pub fn upload_document(name: String, content_hash: String, owner: String) -> u64 {
    COUNTER.with(|c| {
        let mut counter = c.borrow_mut();
        *counter += 1;
        let id = *counter;
        DOCS.with(|docs| {
            docs.borrow_mut().insert(id, Document {
                id,
                name,
                content_hash,
                owner,
                receiver: None,
                uploaded_at: time(),
                transferred_at: None,
            });
        });
        id
    })
}

// Transfer document
#[ic_cdk::update]
pub fn transfer_document(doc_id: u64, new_owner: String) -> Result<String, String> {
    DOCS.with(|docs| {
        let mut docs = docs.borrow_mut();
        if let Some(doc) = docs.get_mut(&doc_id) {
            doc.receiver = Some(new_owner.clone());
            doc.transferred_at = Some(time());
            Ok(format!("Document {} transferred to {}", doc.name, new_owner))
        } else {
            Err("Document not found".to_string())
        }
    })
}

// Get document info
#[ic_cdk::query]
pub fn getdocument(doc_id: u64) -> Option<Document> {
    DOCS.with(|docs| docs.borrow().get(&doc_id).cloned())
}

// List all documents
#[ic_cdk::query]
pub fn list_documents() -> Vec<Document> {
    DOCS.with(|docs| docs.borrow().values().cloned().collect())
}
