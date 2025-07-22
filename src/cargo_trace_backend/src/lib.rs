use ic_cdk::query;
use ic_cdk::update;

#[query]
fn hello(name: String) -> String {
    format!("Hello, {}!", name)
}

#[update]
fn world(name: String) -> String {
    format!("World, {}!", name)
}

// Enable Candid export
ic_cdk::export_candid!();