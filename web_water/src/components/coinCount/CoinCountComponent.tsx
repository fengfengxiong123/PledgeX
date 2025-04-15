import { useCurrentAccount } from "@mysten/dapp-kit";
import { useTokenBalance } from '@/hooks/useTokenBalance';
import { Button, Spin } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import styles from "./coinCount.module.scss";


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