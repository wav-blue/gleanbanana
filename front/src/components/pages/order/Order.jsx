import { useSelector } from "react-redux";
import Side from "../../layout/SideLayout";
import OrderProducts from "./OrderProducts";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";

//이 컴포넌트가 있을 필요? 없을듯한데
const Order = () => {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.user.userId);

  useEffect(() => {
    if (!userId) navigate("/");
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
