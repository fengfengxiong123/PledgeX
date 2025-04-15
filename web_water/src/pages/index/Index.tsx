import NewsComponent from "@/components/news/NewsComponent"; // 引入列表组件
import APYRankComponent from "@/components/apyRank/APYRankComponent"; // 引入列表组件
// import CoinCountComponent from "@/components/coinCount/CoinCountComponent"; // 引入持币量组件

// 主组件
function Index() {
  return (
    <div >
      <div>
        {/* <CoinCountComponent /> */}
        <APYRankComponent />
        <NewsComponent />
      </div>
    </div>
  );
}

export default Index;