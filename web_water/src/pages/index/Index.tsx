import NewsComponent from "@/components/news/NewsComponent"; // 引入列表组件
import APYRankComponent from "@/components/apyRank/APYRankComponent"; // 引入列表组件

// 主组件
function Index() {
  return (
    <div >
      <div>
        <APYRankComponent />
        <NewsComponent />
      </div>
    </div>
  );
}

export default Index;