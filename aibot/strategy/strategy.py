import yaml
import requests

from abc import ABC, abstractmethod
from typing import Any, Dict, List
from pathlib import Path

from aibot.logger import logger


class BaseStrategy(ABC):
    def __init__(self, config: Dict[Any, Any]):
        super().__init__()

        self.config = config


    @abstractmethod
    def analyze_market(self, price: List[float]):
        raise NotImplementedError
        

    def get_coin_price(self, address, bar, limit):
        """获取当前价格数据"""
        headers = {"Content-Type": "application/json"}
        payload = {
            "chainId": 784,
            "address": address,
            "bar": bar,
            "limit": limit
        }

        # TODO: retry
        try:
            resp = requests.get(self.data_url, headers=headers, params=payload)
            resp.raise_for_status()
            print(f'resp: {resp.json()}')
            data = resp.json()['data'][0][1:-1]
            logger.info(f"得到价格数据：{data}")
            return data
        except Exception as e:
            logger.error(f"获取价格数据失败：{str(e)}")
            return None


    @staticmethod
    def format_signal(action: str, reason: str) -> Dict[str, str]:
        allowed_actions = {"加仓", "不变", "减仓"}
        if action not in allowed_actions:
            raise ValueError(f"无效交易动作: {action}，允许的操作: {allowed_actions}")
        
        return {
            "决策": action,
            "理由": reason
        }