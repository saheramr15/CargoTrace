use pocket_ic::PocketIc;

#[test]
fn test_backend_with_pocketic() {
    let pic = PocketIc::new();

    // build wasm before running test
    let wasm = std::fs::read("../target/wasm32-unknown-unknown/release/cargo_trace_backend.wasm")
        .expect("Run `cargo build --target wasm32-unknown-unknown --release` first");

    let canister_id = pic.create_canister();
    pic.install_canister(canister_id, wasm, vec![], None);

    // Call candid method
    let result = pic.update_call(
        canister_id,
        "your_method",
        candid::encode_args(()).unwrap(),
    );

    assert!(result.is_ok());
}
