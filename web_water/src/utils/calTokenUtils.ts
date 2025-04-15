function calculateOwnedValue(
    addr: string,
    balanceData: any,
    price: string
): string {
    // 查找对应地址的代币余额
    const ownedObj = balanceData.find((item: any) => item.tokenType === addr);
    if (!ownedObj) {
        return '0'; // 如果没有找到对应的代币余额，返回 0
    }
    // 转换为 BigInt 并计算持有价值
    const balance = BigInt(ownedObj.tokenBalance);
    const priceInGwei = Math.floor(Number(price) * 1e9); // 转换为整数
    const priceBigInt = BigInt(priceInGwei); // 将价格转换为整数，乘以 1e9
    const ownedValueInGwei = (balance * priceBigInt) / BigInt(1e9);

    // 转换回 number 类型返回
    const ownedValueInStandardUnit = Number(ownedValueInGwei) / 1e9;
    return ownedValueInStandardUnit.toFixed(3);
}

export { calculateOwnedValue };