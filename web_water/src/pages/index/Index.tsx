import { Button } from "antd";
import styles from "./index.module.scss";
function Index() {
  return (
    <div className={styles.index}>
      <div className={styles.top}>
        <div className={styles.top_item}>
          <div className={styles.top_name}>Your Supplies</div>
          <div className={styles.top_data}>$4.82</div>
        </div>
        <div className={styles.top_item}>
          <div className={styles.top_name}>Your APR</div>
          <div className={styles.top_data}>4.79%</div>
        </div>
        <div className={styles.top_item}>
          <div className={styles.top_name}>Item Name</div>
          <div className={styles.top_data}>0.00%</div>
        </div>
        <div className={styles.top_item}>
          <div className={styles.top_name}>Item Name</div>
          <div className={styles.top_data}>0.00%</div>
        </div>
      </div>
      <div className={styles.wrap}>
        <div className={styles.left}>
          <div className={styles.title}>AI最新操作</div>
          <div className={styles.table_title}>
            <div className={styles.table_title_item}>时间</div>
            <div className={styles.table_title_item}>操作</div>
            <div className={styles.table_title_item}>价格</div>
            <div className={styles.table_title_item}>解析</div>
          </div>
          <div className={styles.table_wrap}>
            <div className={styles.table_wrap_item}>2024-12-31 13:24</div>
            <div className={styles.table_wrap_item}>买入</div>
            <div className={styles.table_wrap_item}>1.24</div>
            <div className={styles.table_wrap_item}>
              <Button type="primary" size="small">
                操作解析
              </Button>
            </div>
          </div>
          <div className={styles.table_wrap}>
            <div className={styles.table_wrap_item}>2025-03-13 13:24</div>
            <div className={styles.table_wrap_item}>卖出</div>
            <div className={styles.table_wrap_item}>1.78</div>
            <div className={styles.table_wrap_item}>
              <Button type="primary" size="small">
                操作解析
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.title}>概览</div>
          <div className={styles.content}>
            <div className={styles.content_item}>
              <div className={styles.content_left}>1SUSDC = 1USDC</div>
              <Button type="primary" size="small">操作</Button>
            </div>
            <div className={styles.content_item}>
              <div className={styles.content_left}>1SNS = 1NS</div>
              <Button type="primary" size="small">操作</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
