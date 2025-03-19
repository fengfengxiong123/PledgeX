import {getFullnodeUrl, SuiClient} from "@mysten/sui/client";
import { createNetworkConfig } from "@mysten/dapp-kit";

const { networkConfig, useNetworkVariable, useNetworkVariables } =
  createNetworkConfig({
    devnet: {
      url: getFullnodeUrl("devnet"),
    },
    testnet: {
      url: getFullnodeUrl("testnet"),
        packageUSDC:"0xf3384ab33801d07c79768d41c41a3ca19f982f81b5fa0dd27a27e9cc8daf110a",
        packageNS:"0xcc33fdacad44e8a9d3803fbedb7cdc485accd81d59f9f64ff05c10e4b415262d",
        TreasuryCapUSDC:"0x0b45d5c4f16687ab5a76ad976aef6f4bb85f53dd7cb1ba2571d74ebe2803d17a",
        TreasuryCapNS:"0x115f174539dde2b85b97376f4cd6a47130d474518b6ec82a51bcd543ecfa8619",
    },
    mainnet: {
      url: getFullnodeUrl("mainnet"),
    },
  });

const suiClient = new SuiClient({
    url:networkConfig.testnet.url,
})
export { useNetworkVariable, useNetworkVariables, networkConfig,suiClient };
