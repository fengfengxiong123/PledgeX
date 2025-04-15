import { useSuiClient } from "@mysten/dapp-kit";
import { useQuery } from "@tanstack/react-query";

// 代币余额的hook
// 该hook用于获取指定账户地址的代币余额
function useTokenBalance(tokenType: string, accountAddress?: string) {
    const client = useSuiClient();

    return useQuery({
        queryKey: ["token-balance", tokenType, accountAddress],
        queryFn: async () => {
            if (!accountAddress) return BigInt(0);

            // 如果是 SUI 代币
            if (tokenType === "0x2::sui::SUI") {
                const balance = await client.getBalance({
                    owner: accountAddress,
                });
                return BigInt(balance.totalBalance); // 假设余额是以 SUI 为单位的
            }

            // 如果是其他代币
            const coins = await client.getAllCoins({
                owner: accountAddress,
            });
            console.log("coins", coins); // 调试输出

            const all_balance = await client.getAllBalances({
                owner: accountAddress,
            });
            console.log("all_balance", all_balance); // 调试输出

            const filteredCoins = coins.data.filter(
                (coin) => coin.coinType === tokenType
            );

            return filteredCoins.reduce(
                (total, coin) => total + BigInt(coin.balance),
                BigInt(0)
            );
        },
        enabled: !!accountAddress, // 仅在账户地址存在时启用查询
    });
}


// 处理账户所有token余额的hook
function useAllTokenBalances(tokenTypes: string[], accountAddress?: string) {
    const client = useSuiClient();

    return useQuery({
        queryKey: ["token-balances", tokenTypes, accountAddress],
        queryFn: async () => {
            if (!accountAddress) {
                return [];
            }

            // 获取当前账户的所有代币
            const coins = await client.getAllCoins({
                owner: accountAddress,
            });

            // 筛选符合条件的代币
            const filteredBalances = tokenTypes.map((tokenType) => {
                const filteredCoins = coins.data.filter(
                    (coin) => coin.coinType === tokenType
                );

                // 计算总余额
                const totalBalance = filteredCoins.reduce(
                    (total, coin) => total + BigInt(coin.balance),
                    BigInt(0)
                );

                return {
                    tokenType:tokenType,
                    tokenBalance: totalBalance.toString(), // 转换为字符串以避免大整数问题
                };
            });

            return filteredBalances;
        },
        enabled: !!accountAddress, // 仅在账户地址存在时启用查询
    });
}



export { useTokenBalance, useAllTokenBalances };