import Side from "../../layout/SideLayout";
import MyChart from "./MyChart";
import MonthlyChart from "./MonthlyChart";

const MyPage = () => {
  return (
    <div className="mypage">
      <div className="mypage__sidebar">
        <Side />
      </div>
      <div className="mypage__content">
        <MyChart />
        <MonthlyChart />
      </div>
    </div>
  );
};

export default MyPage;
