import time
import yaml
import strategy
from pysui import SuiConfig, SyncClient
from pysui.sui.sui_types import ObjectID

from pathlib import Path
from aibot.logger import logger


class StupidSuiTradeBot:
    def __init__(self, config_path: str = '.config.yaml'):
        self.config = self._load_config(config_path)

        # 网络配置
        self.network_env = self.config['network']['environment']
        network_config = self.config['network'][self.network_env]
        logger.info(f"环境：{self.network_env}")
        
        # Sui 客户端
        self.sui_client = self._init_sui_client(network_config)
        
        # 配置策略
        self.strategies = []
        strategies = self.config['strategies']
        for name in strategies:
            strategy_cls = getattr(strategy, name)
            self.strategies.append(strategy_cls(self.config))
        
        self.contract_address = self.config['contracts'][self.network_env]
        self.data_url = self.config['data']['url']
        self.interval = self.config['settings'].get('interval_seconds', 3600)


    def _load_config(self, config_path):
        """加载 yaml 文件"""
        config_path = Path(config_path)
        if not config_path.exists():
            raise FileNotFoundError(f"配置文件 {config_path} 不存在")
        
        with open(config_path) as f:
            return yaml.safe_load(f)
        
    
    def _init_sui_client(self, network_config):
        """初始化 Sui 客户端"""
        logger.info(f"{network_config}")
        sui_config = SuiConfig.user_config(
            rpc_url=network_config['rpc_url'],
            prv_keys=[network_config['private_key']]
        )
        return SyncClient(sui_config)
    

    def call_add(self):
        pass
        print('call add')


    def call_decrease(self):
        pass
        print('call decrease')


    def _execute(self):
        """处理单个周期的工作流程"""

        signals = [strategy.analyze_market() for strategy in self.strategies]
        # TODO: 根据优先级排序
        print(signals)

        if signals[0]['决策'] == '加仓':
            logger.info('执行 AI 加仓操作')
            self.call_add()
        elif signals[0]['决策'] == '减仓':
            logger.info('执行 AI 减仓操作')
            self.call_decrease()


    def run(self):
        """启动无限循环"""
        logger.info('AI 服务启动...')
        # while True:
        for i in range(1):
            try:
                self._execute()
                logger.info(f'当前周期执行结束，等待 {self.interval} 秒')
                time.sleep(self.interval)
            except Exception as e:
                logger.error(f"错误: {str(e)}")
                time.sleep(60)


if __name__ == "__main__":
    agent = StupidSuiTradeBot(config_path="aibot/configs/config.yaml")
    agent.run()