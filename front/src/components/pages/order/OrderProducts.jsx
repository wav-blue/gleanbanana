import OrderProduct from "./OrderProduct";

import tomato from "../../../assets/tomato.png";
import salad from "../../../assets/salad.png";
import peanut from "../../../assets/peanut.png";

const OrderProductList = [
  {
    img: tomato,
    id: 1,
    orderStaus: "배송중",
    orderDate: "오늘 오후 4시 도착 예정",
    orderPrice: "20020",
    bananaIdx: 2.59,
  },
  {
    img: salad,
    id: 2,
    orderStaus: "배송시작",
    orderDate: "내일 오전 도착 예정",
    orderPrice: "21560",
    bananaIdx: 2.38,
  },
  {
    img: peanut,
    id: 3,
    orderStaus: "결제완료",
    orderDate: "금요일 오전 도착 예정",
    orderPrice: "9600",
    bananaIdx: 3.6,
  },
];

const OrderProducts = () => {
  return (
    <div className="order__wrapper">
      <div className="order__head">
        <div>주문내역 / 배송조회</div>
      </div>
      <div className="order__wrapper">
        <div className="order">
          {OrderProductList.map((order, idx) => (
            <OrderProduct
              key={`order-${idx}`}
              src={order.img}
              status={order.orderStaus}
              date={order.orderDate}
              price={order.orderPrice}
              bananaIdx={order.bananaIdx}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderProducts;
