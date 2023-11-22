import Categories from "./Categories";
import Charts from "./Charts";
import Recommendations from "./Recommendations";

// 주류  견과류 음료 고기 생선 제과류(dessert) 간식류(snack) 과일 채소 유제품 기타

const Home = () => {
  return (
    <div className="home">
      <Charts />
      <Categories showAllBtn="true" />
      <Recommendations />
    </div>
  );
};

export default Home;
