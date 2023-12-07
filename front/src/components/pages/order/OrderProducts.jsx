import OrderProduct from "./OrderProduct";
import useApi from "../../../hooks/useApi";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { orderActions } from "../../../store/order";

const OrderProducts = () => {
  const userId = useSelector((state) => state.user.userId);
  const orderProductList = useSelector((state) => state.order.orderedItems);
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
    if (reqIdentifier === "getData") {
      console.log("orderProductList를 세팅", result?.data);
      dispatch(orderActions.storeToOrdered(result?.data));
    }
  }, [reqIdentifier, result.data, dispatch]);

  useEffect(() => {
    console.log(orderProductList);
  }, [orderProductList]);

  return (
    <div className="order__wrapper">
      <div className="order__head">
        <div>주문내역 / 배송조회</div>
      </div>
      <div className="order__wrapper">
        <div className="order">
          {orderProductList &&
            orderProductList?.map((order, idx) => (
              <OrderProduct key={`order-${idx}`} order={order} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default OrderProducts;
