import { useEffect, useState } from 'react';
import { Table, Tag, } from 'antd';


interface ProtocolData {
    key: string;
    protocolName: 'Navi' | 'Scallop';
    protocolType: '借贷' | 'DEX' | '质押' | '衍生品';
    apy: number;
    riskLevel: 'low' | 'medium' | 'high';
    tvl: number;
    lastUpdated: string;
}


function APYRankComponent() {
    // 定义状态
    const [filterName, setFilterName] = useState<string>();
    const [filterType, setFilterType] = useState<string>();
    const [data, setData] = useState<ProtocolData[]>([]); // 初始数据
    const [loading, setLoading] = useState(false); // 加载状态

    // 列定义
    const columns = [
        {
            title: '协议名称',
            dataIndex: 'protocolName',
            filters: [
                { text: 'Navi', value: 'Navi' },
                { text: 'Scallop', value: 'Scallop' },
            ],
            onChange: (value: string) => {
                setFilterName(value);
            },
            onFilter: (value: React.Key | boolean, record: ProtocolData) => {
                // 忽略大小写进行比较
                if (typeof value === 'string') {
                    return record.protocolName.toLowerCase() === value.toLowerCase();
                }
                return false;
            },
            sorter: (a: ProtocolData, b: ProtocolData) => a.protocolName.localeCompare(b.protocolName),
            key: 'protocolName',

        },
        {
            title: '协议类型',
            dataIndex: 'protocolType',
            filters: [
                { text: '借贷', value: '借贷' },
                { text: 'DEX', value: 'DEX' },
                { text: '质押', value: '质押' },
                { text: '衍生品', value: '衍生品' },
            ],
            onChange: (value: string) => {
                setFilterType(value);
            },
            // filterMultiple: false, // 单选
            onFilter: (value: React.Key | boolean, record: ProtocolData) => {
                if (typeof value === 'string') {
                    return record.protocolType === value;
                }
                return false;
            },
            sorter: (a: ProtocolData, b: ProtocolData) => a.protocolName.localeCompare(b.protocolName),
            key: 'protocolType',
        },
        {
            title: '收益率(APY)',
            dataIndex: 'apy',
            key: 'apy',
            sorter: (a: ProtocolData, b: ProtocolData) => a.apy - b.apy, // Ant Design 自带排序逻辑
            render: (value: number) => `${value.toFixed(2)}%`,
        },
        {
            title: '风险等级',
            dataIndex: 'riskLevel',
            key: 'riskLevel',
            render: (value: "low" | "medium" | "high") => {
                const colorMap = {
                    low: 'green',
                    medium: 'orange',
                    high: 'red',
                };
                return <Tag color={colorMap[value]}>{value.toUpperCase()}</Tag>;
            }
        },
        {
            title: 'TVL(万)',
            dataIndex: 'tvl',
            key: 'tvl',
            render: (value: number) => `$${(value / 10000).toFixed(2)}万`,
            sorter: (a: ProtocolData, b: ProtocolData) => a.tvl - b.tvl, // Ant Design 自带排序逻辑
        },
        {
            title: '最后更新',
            dataIndex: 'lastUpdated',
            key: 'lastUpdated',
            sorter: (a: ProtocolData, b: ProtocolData) => new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime(),
        }
    ];

    // 从接口获取数据
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const url = "http://127.0.0.1:9000/api/info_agg/protocol/list";
                const res = await fetch(url);
                if (res.ok) {
                    const result = await res.json();
                    // 转换接口数据为组件所需格式
                    const formattedData = result.results.map((item: any) => ({
                        key: item.id.toString(),
                        protocolName: item.name,
                        protocolType: item.protocol_type,
                        apy: parseFloat(item.supply_apy),
                        riskLevel: item.risk_level === 0 ? 'low' : item.risk_level === 1 ? 'medium' : 'high',
                        tvl: item.tvl,
                        lastUpdated: item.last_update_time,
                    }));
                    setData(formattedData);
                }
            } catch (error) {
                console.error("数据获取失败:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // 数据过滤
    const filteredData = data.filter(item =>
        (!filterName || item.protocolName === filterName) &&
        (!filterType || item.protocolType === filterType)
    );

    return (
        <div className="protocol-table-container">
            <div className='filter-controls'>
            </div>
            <Table
                columns={columns}
                dataSource={filteredData}
                loading={loading}
                // pagination={{ pageSize: 10 }}
                pagination={false}
                rowClassName={record => `risk-${record.riskLevel}`}
                rowKey="key"
                style={{ marginTop: 20 }}
                scroll={{ x: 800 }}
                locale={{
                    filterConfirm: '确定', // 确认按钮文本
                    filterReset: '重置',  // 重置按钮文本
                    emptyText: '暂无数据', // 无数据时的提示
                }}
            />
        </div>
    );
}

export default APYRankComponent;