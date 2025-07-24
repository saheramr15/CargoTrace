use ic_cdk::query;
use ic_cdk::update;
use ic_stable_structures::{
    memory_manager::{MemoryId, MemoryManager, VirtualMemory},
    DefaultMemoryImpl, StableBTreeMap,
};
use std::cell::RefCell;

type Memory = VirtualMemory<DefaultMemoryImpl>;

thread_local! {
    static MEMORY_MANAGER: RefCell<MemoryManager<DefaultMemoryImpl>> =
        RefCell::new(MemoryManager::init(DefaultMemoryImpl::default()));

    static ID_SET: RefCell<StableBTreeMap<u128, u8, Memory>> = RefCell::new(
        StableBTreeMap::init(
            MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(0)))
        )
    );
}

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
ic_cdk::export_candid!();
