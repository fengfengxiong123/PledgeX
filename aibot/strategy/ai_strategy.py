import requests
import json

from typing import Dict
from strategy.strategy import BaseStrategy
from strategy.prompt import PROMPT
from aibot.logger import logger

class AIStrategy(BaseStrategy):
    def __init__(self, config: Dict[str, str]):
        super().__init__(config)

        conf = self.config['strategies']['AIStrategy']
        self.api_key = conf['api_key']
        self.endpoint = conf['endpoint']
        self.model = conf['model']

        self.data_url = self.config['data']['url']


    def analyze_market(self, coin: str, **kwargs):
        price = self.get_coin_price(
            address=coin,
            bar=kwargs.get('bar', '15m'),
            limit=1
        )
        if price is None:
            return  

        prompt = PROMPT.format(
            open=price[1],
            high=price[2],
            low=price[3],
            close=price[4]
        )
        logger.info(f"[prompt]: {prompt}")

        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {self.api_key}"
        }

        payload = {
            "model": self.model,
            "messages": [{"role": "user", "content": prompt}],
            "temperature": 0.8
        }

        try:
            resp = requests.post(self.endpoint, headers=headers, json=payload)
            resp.raise_for_status()
            advice = resp.json()['choices'][0]['message']['content']
        except Exception as e:
            logger.error(f"AI 请求失败：{str(e)}")
            return None

        try:
            advice = json.loads(advice)
            logger.info(f'[advice]: {advice}')
            return advice
        except Exception as e:
            pass

        try:
            advice = json.loads(advice[7:-3])
            logger.info(f'[advice]: {advice}')
            return advice
        except Exception as e:
            logger.error(f"AI 请求解析失败：{str(e)}")
            return None