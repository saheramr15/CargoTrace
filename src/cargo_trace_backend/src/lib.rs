use ic_cdk::{query, update, caller};
use ic_cdk::export_candid;
use ic_stable_structures::{
    memory_manager::{MemoryId, MemoryManager, VirtualMemory},
    DefaultMemoryImpl, StableBTreeMap,
};
use std::cell::RefCell;
use candid::Principal;
type Memory = VirtualMemory<DefaultMemoryImpl>;

thread_local! {
    static MEMORY_MANAGER: RefCell<MemoryManager<DefaultMemoryImpl>> =
        RefCell::new(MemoryManager::init(DefaultMemoryImpl::default()));

    // Simulated token balances: Principal => balance
    static BALANCES: RefCell<StableBTreeMap<Principal, u64, Memory>> = RefCell::new(
        StableBTreeMap::init(
            MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(0)))
        )
    );

    static ID_SET: RefCell<StableBTreeMap<u128, u8, Memory>> = RefCell::new(
        StableBTreeMap::init(
            MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(1)))
        )
    );
}

// ---------------------
// ICRC-Like Token APIs
// ---------------------

/// Returns the balance of the caller
#[query]
fn get_balance() -> u64 {
    let caller = caller();
    BALANCES.with(|balances| {
        balances.borrow().get(&caller).unwrap_or(0)
    })
}

/// Transfers `amount` tokens from the caller to `to`
/// Only allowed if the caller is authenticated (non-anonymous)
#[update]
fn transfer(to: Principal, amount: u64) -> Result<(), String> {
    let from = caller();
    if from == Principal::anonymous() {
        return Err("Anonymous principal not allowed to transfer tokens.".to_string());
    }

    BALANCES.with(|balances| {
        let mut balances = balances.borrow_mut();
        let from_balance = balances.get(&from).unwrap_or(0);
        if from_balance < amount {
            return Err("Insufficient balance.".to_string());
        }

        // Subtract from sender
        balances.insert(from, from_balance - amount);

        // Add to receiver
        let to_balance = balances.get(&to).unwrap_or(0);
        balances.insert(to, to_balance + amount);

        Ok(())
    })
}

/// Mints tokens to the caller (for testing/demo)
#[update]
fn mint(amount: u64) {
    let caller = caller();
    BALANCES.with(|balances| {
        let mut balances = balances.borrow_mut();
        let current = balances.get(&caller).unwrap_or(0);
        balances.insert(caller, current + amount);
    });
}

// ---------------------
// Original ID logic
// ---------------------

#[update]
fn add_id(id: u128) -> bool {
    ID_SET.with(|set| set.borrow_mut().insert(id, 1).is_none())
}

#[query]
fn has_id(id: u128) -> bool {
    ID_SET.with(|set| set.borrow().contains_key(&id))
}

#[update]
fn remove_id(id: u128) -> bool {
    ID_SET.with(|set| set.borrow_mut().remove(&id).is_some())
}

#[query]
fn get_all_ids() -> Vec<u128> {
    ID_SET.with(|set| set.borrow().iter().map(|entry| *entry.key()).collect())
}

// Export Candid interface
export_candid!();
