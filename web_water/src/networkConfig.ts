import { getFullnodeUrl} from "@mysten/sui/client";
import { createNetworkConfig } from "@mysten/dapp-kit";

const { networkConfig, useNetworkVariable, useNetworkVariables } =
  createNetworkConfig({
    testnet: {
      url: getFullnodeUrl("testnet"),
    },
    mainnet: {
      url: getFullnodeUrl("mainnet"),
    },
  });
// 你可以在这里添加更多的网络配置
// 比如：
// devnet: {
//   url: getFullnodeUrl("devnet"),
//   explorerUrl: "https://explorer.devnet.sui.io",
//   faucetUrl: "https://faucet.devnet.sui.io",
//   explorerUrl: "https://explorer.devnet.sui.io",
//   faucetUrl: "https://faucet.devnet.sui.io",
// },


export { useNetworkVariable, useNetworkVariables, networkConfig };