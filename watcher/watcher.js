// watcher.js (complete corrected file)
import { ethers } from "ethers";
import fetch from "node-fetch";
import { HttpAgent, Actor } from "@dfinity/agent";
import { IDL } from "@dfinity/candid";

// ---- CONFIG ----
const RPC_URL = "https://worldchain-mainnet.g.alchemy.com/v2/rx3izQBwsCvFk3McMgI3P";
const CONTRACT_ADDRESS = "0x8E89a8a47B0C852227b50aD69177693008264c96";
const EGYPT_CUSTOMS_WALLETS = [
  "0x2CDfc16cc5ed9b648D78f098d7d90CE96Fd19004".toLowerCase(),
];
const ICP_BACKEND_URL = "http://127.0.0.1:4943"; // local replica
const CANISTER_ID = "uxrrr-q7777-77774-qaaaq-cai";

// ensure global fetch is available for @dfinity/agent
global.fetch = fetch;

// ---- Helper: create actor with inline IDL (no declarations needed) ----
async function getBackendActor() {
  const TransferPayload = IDL.Record({
    network: IDL.Text,
    contract: IDL.Text,
    tx_hash: IDL.Text,
    block_number: IDL.Nat64,
    token_id: IDL.Text,
    from: IDL.Text,
    to: IDL.Text,
    log_index: IDL.Nat64,
  });

  const idlFactory = ({ IDL }) =>
    IDL.Service({
      ingest_transfer: IDL.Func([TransferPayload], [], []),
      get_transfers: IDL.Func([], [IDL.Vec(TransferPayload)], ["query"]),
    });

  const agent = new HttpAgent({ host: ICP_BACKEND_URL });

  // LOCAL DEVELOPMENT: fetch root key to trust local replica certificates
  // DO NOT use this on mainnet / public IC
  await agent.fetchRootKey();

  const actor = Actor.createActor(idlFactory, {
    agent,
    canisterId: CANISTER_ID,
  });

  return actor;
}

// ---- sendToICP using actor ----
async function sendToICP(payload) {
  try {
    // convert numbers to BigInt (Nat64)
    payload.block_number = BigInt(payload.block_number);
    payload.log_index = BigInt(payload.log_index);

    const backend = await getBackendActor();
    await backend.ingest_transfer(payload);
    console.log(" Sent to ICP canister successfully!");
  } catch (err) {
    console.error(" Error sending to ICP canister:", err);
  }
}

// ---- watcher logic ----
const ERC721_ABI = [
  "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)"
];

async function startWatcher() {
  console.log(" Starting CargoX Watcher...");

  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ERC721_ABI, provider);

  contract.on("Transfer", async (from, to, tokenId, event) => {
    console.log(`🔔 Transfer detected: token ${tokenId} from ${from} → ${to}`);

    if (!EGYPT_CUSTOMS_WALLETS.includes(to.toLowerCase())) {
      console.log(" Not Egypt customs, ignoring this transfer.");
      return;
    }

    const payload = {
      network: "polygon",
      contract: CONTRACT_ADDRESS,
      tx_hash: event.transactionHash,
      block_number: event.blockNumber,
      token_id: tokenId.toString(),
      from,
      to,
      log_index: event.logIndex,
    };

    console.log(" Egypt-related transfer detected:", payload);
    await sendToICP(payload);
  });
}

// ---- fake test ----
async function simulateFakeTransfer() {
  const fakeEvent = {
    transactionHash: "0xFAKE123",
    blockNumber: 123456,
    logIndex: 0,
  };

  const from = "0x1111111111111111111111111111111111111111";
  const to = EGYPT_CUSTOMS_WALLETS[0];
  const tokenId = 42;

  const payload = {
    network: "polygon",
    contract: CONTRACT_ADDRESS,
    tx_hash: fakeEvent.transactionHash,
    block_number: fakeEvent.blockNumber,
    token_id: tokenId.toString(),
    from,
    to,
    log_index: fakeEvent.logIndex,
  };

  console.log(" Simulating  transfer:", payload);
  await sendToICP(payload);
}

// ---- main ----
startWatcher().catch(console.error);
setTimeout(simulateFakeTransfer, 3000);
