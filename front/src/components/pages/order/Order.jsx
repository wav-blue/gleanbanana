import { useSelector } from "react-redux";
import Side from "../../layout/SideLayout";
import OrderProducts from "./OrderProducts";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useConfirm from "../../../hooks/useConfirm";

const Order = () => {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.user.userId);

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
    if (!userId) {
      onConfirm();
    }
  }, [userId]);

  return (
    <div className="mypage">
      <div className="mypage__sidebar">
        <Side />
      </div>
      <div className="mypage__content">
        <OrderProducts />
      </div>
    </div>
  );
};

export default Order;
