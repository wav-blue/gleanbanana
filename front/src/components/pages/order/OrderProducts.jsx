import OrderProduct from "./OrderProduct";

import tomato from "../../../assets/tomato.png";
import salad from "../../../assets/salad.png";
import peanut from "../../../assets/peanut.png";
import useApi from "../../../hooks/useApi";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import order, { orderActions } from "../../../store/order";

// const OrderProductList = [
//   {
//     img: tomato,
//     id: 1,
//     orderStaus: "배송중",
//     orderDate: "오늘 오후 4시 도착 예정",
//     orderPrice: "20020",
//     bananaIdx: 2.59,
//   },
//   {
//     img: salad,
//     id: 2,
//     orderStaus: "배송시작",
//     orderDate: "내일 오전 도착 예정",
//     orderPrice: "21560",
//     bananaIdx: 2.38,
//   },
//   {
//     img: peanut,
//     id: 3,
//     orderStaus: "결제완료",
//     orderDate: "금요일 오전 도착 예정",
//     orderPrice: "9600",
//     bananaIdx: 3.6,
//   },
// ];

const OrderProducts = () => {
  const [orderProductList, setOrderProductList] = useState([]);
  const userId = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();

  const { trigger, result, reqIdentifier } = useApi({
    method: "get",
    path: `/${userId}/orders`,
    data: {},
    shouldInitFetch: false,
  });

  useEffect(() => {
    trigger({ applyResult: true, isShowBoundary: true });
  }, []);

  useEffect(() => {
    console.log("orderProductList를 세팅", orderProductList);
    dispatch(orderActions.storeToOrdered(result.data));
    setOrderProductList(result.data);
  }, [result.data]);

  return (
    <div className="order__wrapper">
      <div className="order__head">
        <div>주문내역 / 배송조회</div>
      </div>
      <div className="order__wrapper">
        <div className="order">
          {orderProductList?.map((order, idx) => (
            <OrderProduct key={`order-${idx}`} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderProducts;
