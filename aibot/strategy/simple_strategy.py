from typing import Dict
from collections import deque
from datetime import datetime

from strategy.strategy import BaseStrategy, TransactionRecord
from aibot.logger import logger


class SimpleStrategy(BaseStrategy):
    def __init__(self, config: Dict[str, str]):
        super().__init__(config)

        self.data_url = self.config['data']['url']
        # TODO: 初始买入时怎么传入？
        # NOTE: 假设只记入买入交易

        conf = self.config['strategies']['SimpleStrategy']
        self.tran_records = deque(maxlen=conf['max_records'])
        self.threshold = conf['threshold']


    def analyze_market(self, coin: str, **kwargs):
        price = self.get_coin_price(
            address=coin,
            bar=kwargs.get('bar', '15m'),
            limit=1
        )
        cur_price = price[4]
        if self.tran_records and self.tran_records[-1].action == 'BUY':
            last_price = self.tran_records[-1].price
            # 价格下跌超过一定的阈值
            if last_price - cur_price > self.threshold:
                # TODO: 交易不一定成功，怎么处理？
                record = TransactionRecord(
                    timestamp=datetime.now(datetime.timezone.utc),
                    action='BUY',
                    symbol=coin.split("::")[-1],
                    quantity=1,
                    price=1,
                    fee=1,
                    status="SUCCESS"
                )
                logger.info(f"交易记录：{record}")
                self.tran_records.append(record)
                return self.format_signal("加仓", f"距上一次买入价格下跌超过 {self.threshold}")
                
            
            
        
