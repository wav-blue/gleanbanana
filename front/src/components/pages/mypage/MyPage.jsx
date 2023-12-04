import Side from "../../layout/SideLayout";
import MyChart from "./MyChart";
import MonthlyChart from "./MonthlyChart";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useConfirm from "../../../hooks/useConfirm";

const MyPage = () => {
  const loggedInUser = useSelector((state) => state.user.userInfo);
  const navigate = useNavigate();
  const toLogin = () => {
    navigate("/login");
  };
  const toHome = () => {
    navigate("/home");
  };
  const onConfirm = useConfirm("로그인후 사용해주세요!", toLogin, toHome);

  useEffect(() => {
    console.log(loggedInUser);
    if (!loggedInUser) {
      onConfirm();
    }
  }, [loggedInUser, navigate]);

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
