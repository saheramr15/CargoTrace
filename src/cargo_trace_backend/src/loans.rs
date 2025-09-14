use candid::{CandidType, Deserialize, Principal};
use ic_cdk::api::call::call;
use ic_cdk::caller;
use ic_cdk_macros::{init, update, query, pre_upgrade, post_upgrade};
use ic_ledger_types::{AccountIdentifier, Memo, Subaccount, Tokens, TransferArgs, DEFAULT_FEE};
use ic_stable_structures::{BTreeMap as StableBTreeMap, DefaultMemoryImpl, StableBTreeMap};
use ic_stable_structures::memory_manager::{MemoryId, MemoryManager, VirtualMemory};
use serde::Serialize;
use std::cell::RefCell;