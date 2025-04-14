import { useSuiClient, useCurrentAccount } from "@mysten/dapp-kit";
import { useQuery } from "@tanstack/react-query";
import { Button, Spin } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import styles from "./coinCount.module.scss";

// 创建自定义 hook
function useTokenBalance(tokenType: string, accountAddress?: string) {
    const client = useSuiClient();

    return useQuery({
        queryKey: ["token-balance", tokenType, accountAddress],
        queryFn: async () => {
            if (!accountAddress) return BigInt(0);

            // 如果是 SUI 代币
            // if (tokenType === "0x2::sui::SUI") {
            //     const balance = await client.getBalance({
            //         owner: accountAddress,
            //     });
            //     return BigInt(balance.totalBalance); // 假设余额是以 SUI 为单位的
            // }

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

// 在组件中使用
function CoinCountComponent() {
    const currentAccount = useCurrentAccount();
    const { data: balance, isLoading, error, refetch, isFetching } =
        useTokenBalance("0x2::sui::SUI", currentAccount?.address);

    if (!currentAccount) return <div className={styles.balanceText}>请先连接钱包</div>;
    if (error) return <div>错误: {error.message}</div>;

    return (
        <div className={styles.container}>
            <span className={styles.balanceText}>
                代币余额:
                {balance
                    ? (Number(balance) / 1_000_000_000).toFixed(3) // 转换为标准单位并保留两位小数
                    : "0"}
                {(isLoading || isFetching) && (
                    <Spin
                        size="small"
                        style={{ marginLeft: "8px", verticalAlign: "middle" }}
                    />
                )}
            </span>
            <Button
                type="text"
                icon={<ReloadOutlined />}
                onClick={() => refetch()}
                disabled={isFetching}
                title="刷新余额"
                className={`${styles.refreshButton} ${isFetching ? styles.disabled : ""}`}
            />
        </div>
    );
}

export default CoinCountComponent;