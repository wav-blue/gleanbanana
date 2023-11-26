import Side from "../../layout/SideLayout";
import OrderProducts from "./OrderProducts";

const Order = () => {
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
