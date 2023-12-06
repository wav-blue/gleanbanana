import Side from "../../layout/SideLayout";
import OrderProducts from "./OrderProducts";

//이 컴포넌트가 있을 필요? 없을듯한데
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
