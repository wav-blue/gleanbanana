import { useEffect, useState } from "react";
import Categories from "./Categories";
import Charts from "./Charts";
import Recommendations from "./Recommendations";
import useApi from "../../../hooks/useApi";
import { useSelector } from "react-redux";

// 주류  견과류 음료 고기 생선 제과류(dessert) 간식류(snack) 과일 채소 유제품 기타

const Home = () => {
  const [recommendations, setRecommendations] = useState([]);
  const { trigger, result } = useApi({
    method: "get",
    path: "/recommend",
    shouldInitFetch: true,
  });

  const getRecommends = async () => {
    const resultData = await trigger({
      applyResult: true,
      isShowBoundary: true,
    });
    setRecommendations(resultData.data);
  };
  useEffect(() => {
    getRecommends();
  }, []);

  useEffect(() => {
    setRecommendations(result.data);
  }, [result.data]);
  return (
    <div className="home">
      <div className="home__wrapper">
        <div className="chart">
          <div className="chart__head">오늘의 바나나 인덱스 </div>
          <Charts />
        </div>
        <Categories showAllBtn="true" />
        <Recommendations recommendations={recommendations} />
      </div>
    </div>
  );
};

export default Home;
