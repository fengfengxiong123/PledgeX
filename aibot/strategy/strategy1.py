import requests

from typing import Any, Dict, List
from strategy.strategy import BaseStrategy
from aibot.logger import logger

class Strategy1(BaseStrategy):
    def __init__(self, config: Dict[str, str]):
        super().__init__(config)

        self.data_url = self.config['data']['url']

    
    def analyze_market(self, price: List[float]):
        # TODO
        pass
        
