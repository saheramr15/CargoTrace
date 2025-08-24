// watcher.js
import { ethers } from "ethers";
import fetch from "node-fetch";
import pkg from "@dfinity/agent";
const { HttpAgent, Actor, IDL } = pkg;
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// ---- CONFIG ----
const WS_RPC_URL = "wss://eth-mainnet.g.alchemy.com/v2/rx3izQBwsCvFk3McMgI3P"; 
const CONTRACT_ADDRESS = "0x8d6Fd650500f82c7D978a440348e5a9b886943bF"; // replace with your contract
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
    payload.block_number = BigInt(payload.block_number);
    payload.log_index = BigInt(payload.log_index);
    const backend = await getBackendActor();
    await backend.ingest_transfer(payload);
    console.log("Sent to ICP canister:", payload.tx_hash);
  } catch (err) {
    console.error("Error sending to ICP:", err);
  }
}

// ---- Save & load last processed block ----
function saveLastBlock(blockNumber) {
  fs.writeFileSync(CHECKPOINT_FILE, blockNumber.toString(), "utf-8");
}

function loadLastBlock() {
  if (fs.existsSync(CHECKPOINT_FILE)) {
    return parseInt(fs.readFileSync(CHECKPOINT_FILE, "utf-8"), 10);
  }
  return null;
}

// ---- Watcher ----
const ERC721_ABI = [
  "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)"
];

let provider;
let contract;

async function startWatcher() {
  console.log("Starting CargoX Watcher...");

  provider = new ethers.WebSocketProvider(WS_RPC_URL);

  // Listen for provider errors
  provider.on("error", (err) => {
    console.error("Provider error:", err);
  });

  contract = new ethers.Contract(CONTRACT_ADDRESS, ERC721_ABI, provider);

  // Catch up from last block
  const lastBlock = loadLastBlock();
  const fromBlock = lastBlock ? lastBlock + 1 : await provider.getBlockNumber();
  console.log("Querying past events from block:", fromBlock);

  try {
    const pastEvents = await contract.queryFilter(contract.filters.Transfer(), fromBlock, "latest");
    for (const event of pastEvents) {
      await processEvent(event);
    }
  } catch (err) {
    console.error("Error fetching past events:", err);
  }

  // Listen to new Transfer events
  contract.on("Transfer", async (from, to, tokenId, event) => {
    await processEvent(event);
  });
}

// ---- Process a single event ----
async function processEvent(event) {
  if (!event || !event.args) return;

  const { from, to, tokenId } = event.args;

  //  REMOVE wallet filter: process all transfers
  const payload = {
    network: "ethereum",
    contract: CONTRACT_ADDRESS,
    tx_hash: event.transactionHash,
    block_number: event.blockNumber,
    token_id: tokenId.toString(),
    from,
    to,
    log_index: event.logIndex,
  };

  console.log("📦 Transfer detected:", payload.tx_hash, `from ${from} to ${to}`);
  await sendToICP(payload);
  saveLastBlock(event.blockNumber);
}

// ---- Start watcher ----
startWatcher().catch(console.error);
