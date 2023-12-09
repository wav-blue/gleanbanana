import OrderProduct from "./OrderProduct";
import useApi from "../../../hooks/useApi";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { orderActions } from "../../../store/order";
import { purchaseActions } from "../../../store/purchase";

const OrderProducts = () => {
  const userId = useSelector((state) => state.user.userId);
  const orderProductList = useSelector((state) => state.order.orderedItems);
  const dispatch = useDispatch();

  const { trigger, result, reqIdentifier } = useApi({
    method: "get",
    path: `/${userId}/orders`,
    shouldInitFetch: false,
  });

  useEffect(() => {
    dispatch(purchaseActions.clearPurchaseList());

    trigger({ applyResult: true, isShowBoundary: true });
  }, []);

  useEffect(() => {
    if (reqIdentifier === "getData" && result.data !== undefined) {
      dispatch(orderActions.storeToOrdered(result?.data));
    }
  }, [reqIdentifier, result.data, dispatch]);

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
          {!orderProductList && "아직 주문한 상품이 없습니다."}
        </div>
      </div>
    </div>
  );
};

export default OrderProducts;
