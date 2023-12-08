import ConsumerInfo from "../purchase/ConsumerInfo";
import DeliveryInfo from "../purchase/DeliveryInfo";
import OrderedProduct from "../order/OrderedProduct";
import OrderedInfo from "../order/OrderedInfo";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useApi from "../../../hooks/useApi";
import useConfirm from "../../../hooks/useConfirm";

const OrderedDetail = () => {
  const userId = useSelector((state) => state.user.userId);
  const { orderId } = useParams();
  const [itemList, setItemList] = useState([]);
<<<<<<< HEAD
  const [orderInfo, setOrderInfo] = useState([]);
=======
  const [orderInfo, setOrderInfo] = useState({});
  const navigate = useNavigate();
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
>>>>>>> feature/signup

  const { trigger, result } = useApi({
    method: "get",
    path: `/${userId}/orders/${orderId}`,
    shouldInitFetch: false,
  });

  // const getOrderInfo = async () => {
  //   await trigger({
  //   method: "get",
  //   path: `/${userId}/orders/${orderId}`,
  //   applyResult: true,
  //   isShowBoundary: true,
  // });
  // };

  useEffect(() => {
    trigger({
      method: "get",
      path: `/${userId}/orders/${orderId}`,
      applyResult: true,
      isShowBoundary: true,
    });
  }, [userId, orderId]);

  useEffect(() => {
    console.log("data? ", result?.data);
    if (result.data !== undefined) {
      setItemList(result.data.items);
      setOrderInfo(result.data);
    }
  }, [result.data]);

  return (
    <div className="ordered__wrapper">
      <div className="ordered__info">
        <div className="title title__head">주문내역 조회</div>
        <div className="line line__out" />
        <div className="title title__element">구매자 정보</div>
        <div className="line line__in" />
        <ConsumerInfo />
        <div className="line line__out" />
        <div className="title title__element">배송 정보</div>
        <div className="line line__in" />
        <DeliveryInfo disabled={true} />
        <div className="line line__out" />
        <div className="title title__element">배송 물품 내역 (3)</div>
        <div className="line line__in" />
        <OrderedProduct itemList={itemList} />
        <div className="line line__out" />
        <div className="title title__element">결제정보</div>
        <div className="line line__in" />
        <OrderedInfo orderInfo={orderInfo} />
      </div>
    </div>
  );
};

export default OrderedDetail;
