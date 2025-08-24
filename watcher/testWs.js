import { ethers } from "ethers";

const WS_RPC_URL = "wss://eth-mainnet.g.alchemy.com/v2/rx3izQBwsCvFk3McMgI3P";
const provider = new ethers.WebSocketProvider(WS_RPC_URL);

// Listen for errors
provider.on("error", (err) => {
  console.error("Provider error:", err);
});

// Listen for new blocks
provider.on("block", (blockNumber) => {
  console.log("New block:", blockNumber);
});

// Simple connectivity test
(async () => {
  const block = await provider.getBlockNumber();
  console.log("Connected! Current block:", block);
})();
