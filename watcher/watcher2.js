// watcher.js
import { ethers } from "ethers";
import fetch from "node-fetch";
import pkg from "@dfinity/agent";
const { HttpAgent, Actor } = pkg;
import { IDL } from "@dfinity/candid";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";


// ---- CONFIG ----
const WS_RPC_URL = "wss://eth-mainnet.g.alchemy.com/v2/rx3izQBwsCvFk3McMgI3P";
const CONTRACT_ADDRESS = "0xd4190DD1dA460fC7Bc41a792e688604778820aC9";
const ICP_BACKEND_URL = "http://127.0.0.1:4943";
const CANISTER_ID = "uxrrr-q7777-77774-qaaaq-cai";

// ---- ESM __dirname fix ----
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CHECKPOINT_FILE = path.join(__dirname, "lastBlock.txt");

// Ensure global fetch for @dfinity/agent
global.fetch = fetch;

// ---- Helper: ICP Actor ----
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
  await agent.fetchRootKey();

  return Actor.createActor(idlFactory, { agent, canisterId: CANISTER_ID });
}

// ---- Send payload to ICP ----
async function sendToICP(payload) {
  try {
    payload.block_number =
      payload.block_number !== undefined ? BigInt(payload.block_number) : 0n;
    payload.log_index =
      payload.log_index !== undefined ? BigInt(payload.log_index) : 0n;
    payload.tx_hash = payload.tx_hash ?? "unknown_tx";

    const backend = await getBackendActor();
    await backend.ingest_transfer(payload);
    console.log("Sent to ICP canister:", payload.tx_hash);
  } catch (err) {
    console.error("Error sending to ICP:", err);
  }
}

// ---- Save & load last processed block ----
function saveLastBlock(blockNumber) {
  if (blockNumber !== undefined) {
    fs.writeFileSync(CHECKPOINT_FILE, blockNumber.toString(), "utf-8");
  }
}

function loadLastBlock() {
  if (fs.existsSync(CHECKPOINT_FILE)) {
    return parseInt(fs.readFileSync(CHECKPOINT_FILE, "utf-8"), 10);
  }
  return null;
}

// ---- ABI ----
const ERC721_ABI = [
  "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)",
];

let provider;
let contract;

// ---- Catch up events in chunks ----
async function catchUpEvents(fromBlock) {
  const latestBlock = await provider.getBlockNumber();
  const step = 500; // max allowed by RPC

  for (let start = fromBlock; start <= latestBlock; start += step) {
    const end = Math.min(start + step - 1, latestBlock);
    console.log(`Querying events from block ${start} to ${end}...`);

    try {
      const events = await contract.queryFilter(
        contract.filters.Transfer(),
        start,
        end
      );

      for (const event of events) {
        await processEvent(event);
      }

      saveLastBlock(end);
    } catch (err) {
      console.error(`Error fetching logs from ${start} to ${end}:`, err);
      break; // stop if RPC fails
    }
  }
}

// ---- Start watcher ----
async function startWatcher() {
  console.log("Starting CargoX Watcher...");

  provider = new ethers.WebSocketProvider(WS_RPC_URL);

  provider.on("error", (err) => {
    console.error("Provider error:", err);
  });

  provider._websocket?.on("close", () => {
    console.warn("WebSocket closed. Reconnecting in 5s...");
    setTimeout(startWatcher, 5000);
  });

  contract = new ethers.Contract(CONTRACT_ADDRESS, ERC721_ABI, provider);

  const lastBlock = loadLastBlock();
  const fromBlock = lastBlock ? lastBlock + 1 : await provider.getBlockNumber();
  console.log("Catching up from block:", fromBlock);

  await catchUpEvents(fromBlock);

  // ---- Listen to new events ----
  contract.on("Transfer", async (from, to, tokenId, event) => {
    await processEvent(event);
  });
}

// ---- Process a single event ----
async function processEvent(event) {
  if (!event || !event.args) return;

  const { from, to, tokenId } = event.args;

  if (!event.transactionHash) {
    console.warn("Skipping event with undefined transaction hash");
    return;
  }

  const payload = {
    network: "ethereum",
    contract: CONTRACT_ADDRESS,
    tx_hash: event.transactionHash,
    block_number: event.blockNumber ?? 0,
    token_id: tokenId?.toString() ?? "0",
    from: from ?? "unknown",
    to: to ?? "unknown",
    log_index: event.logIndex ?? 0,
  };

  console.log(
    "Transfer detected:",
    payload.tx_hash,
    `from ${from} to ${to} (token ${payload.token_id})`
  );
  await sendToICP(payload);
  saveLastBlock(event.blockNumber);
}

// ---- Start watcher ----
startWatcher().catch(console.error);
