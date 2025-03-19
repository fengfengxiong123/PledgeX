import React, { useState } from "react";
import { useCurrentAccount, useSignAndExecuteTransaction } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { networkConfig } from "../config/networkConfig";

const FaucetMint: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
    const currentAccount = useCurrentAccount();
    const { mutateAsync: signAndExecute, isError } = useSignAndExecuteTransaction();
    const PackageUSDC = networkConfig.testnet.packageUSDC;
    const TreasureCapUSDC = networkConfig.testnet.TreasuryCapUSDC;
    const [loading, setLoading] = useState(false);
    const [num, setNum] = useState(100000);

    const create = async () => {
        if (!currentAccount?.address) {
            console.error("No connected account found.");
            return;
        }
        console.log("adress", currentAccount.address);
        setLoading(true);
        try {
            const tx = new Transaction();
            tx.setGasBudget(10000000);

            tx.moveCall({
                package: PackageUSDC,
                module: "usdc_faucet",
                function: "mint",
                typeArguments: ['0xf3384ab33801d07c79768d41c41a3ca19f982f81b5fa0dd27a27e9cc8daf110a::usdc_faucet::USDC_FAUCET'],
                arguments: [
                    tx.object(TreasureCapUSDC),
                    tx.pure.u64(num*1e10), // 使用状态变量中的category值
                    tx.object(currentAccount.address),
                ],
            });
            const result = await signAndExecute({ transaction: tx });
            if (result && !isError) {
                onSuccess();
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Enter amount"
            value={num}
            onChange={(e) => setNum(Number(e.target.value))} // 绑定输入事件
          />
          <button
            onClick={create}
            disabled={!num || loading} // 禁用按钮直到输入了amount且不在加载状态
          >
              {loading ? 'Loading...' : 'Mint USDC'}
          </button>
      </div>
    );
};

export default FaucetMint;



