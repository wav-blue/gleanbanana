import Side from "../../layout/SideLayout";
import MyChart from "./MyChart";
import MonthlyChart from "./MonthlyChart";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useConfirm from "../../../hooks/useConfirm";
import { userLoginActions } from "../../../store/userLogin";
import useApi from "../../../hooks/useApi";

const MyPage = () => {
  const userId = useSelector((state) => state.user.userId);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { trigger, result, reqIdentifier, loading, error } = useApi({
    method: "get",
    path: `/${userId}`,
    shouldInitFetch: false,
  });

  useEffect(() => {
    trigger({
      applyResult: true,
      isShowBoundary: true,
    });
  }, []);

  useEffect(() => {
    dispatch(userLoginActions.storeUserInfo(result.data));
  }, [result.data]);

  const toLogin = () => {
    navigate("/login");
  };
  const toHome = () => {
    navigate("/home");
  };
  const onConfirm = useConfirm(
    "로그인된 유저만 사용가능합니다!",
    toLogin,
    toHome
  );

  useEffect(() => {
    console.log(userId);
    if (!userId) {
      onConfirm();
    }
  }, [userId, navigate]);

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
