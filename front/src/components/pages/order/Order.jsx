import Side from "../../layout/SideLayout";

const Order = () => {
  return (
    <div className="mypage">
      <div className="mypage__sidebar">
        <Side />
      </div>
      <div className="mypage__content">
        <div>주문내역</div>
      </div>
    </div>
  );
};

export default Order;
