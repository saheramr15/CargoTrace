use candid::Principal;
use ic_cdk::storage;
use ic_cdk_macros::*;
use std::collections::BTreeSet;

// ---- STATE ----
thread_local! {
    static PRINCIPALS: std::cell::RefCell<BTreeSet<Principal>> =
        std::cell::RefCell::new(BTreeSet::new());
}

#[pre_upgrade]
fn pre_upgrade() {
    let principals = PRINCIPALS.with(|p| p.borrow().clone());
    storage::stable_save((principals,)).unwrap();
}

#[post_upgrade]
fn post_upgrade() {
    let (saved_principals,): (BTreeSet<Principal>,) = storage::stable_restore().unwrap();
    PRINCIPALS.with(|p| *p.borrow_mut() = saved_principals);
}

// ---- API ----
#[update]
pub fn save_principal(principal: Principal) {
    PRINCIPALS.with(|p| {
        p.borrow_mut().insert(principal);
    });
}

#[query]
pub fn get_principals() -> Vec<Principal> {
    PRINCIPALS.with(|p| p.borrow().iter().cloned().collect())
}
