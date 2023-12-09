//인증되지 않은 유저는 로그인 페이지로
import ConsumerInfo from "../purchase/ConsumerInfo";
import DeliveryInfo from "./DeliveryInfo";
import PurchasedProduct from "../purchase/PurchasedProduct";
import PurchasedInfo from "../purchase/PurchasedInfo";
import PurchaseButtons from "../purchase/PurchaseButtons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { purchaseActions } from "../../../store/purchase";

//구매하기 전 페이지
const Purchase = () => {
  const toPurchaseList = useSelector((state) => state.purchase.toPurchaseList);

  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    if (!userInfo?.user_id) {
      console.log("userId가 없어서 /home으로 보냄");
      return navigate("/");
    }
  }, [userInfo]);

  return (
    <div className="purchase__wrapper">
      <div className="purchase__info">
        <div className="title title__head">주문/결제</div>
        <div className="line line__out" />
        <div className="title title__element">구매자 정보</div>
        <div className="line line__in" />
        <ConsumerInfo />
        <div className="line line__out" />
        <div className="title title__element">배송 정보</div>
        <div className="line line__in" />
        <DeliveryInfo />
        <div className="line line__out" />
        <div className="title title__element">
          {`배송 물품 내역 (${toPurchaseList.length})`}
        </div>
        <div className="line line__in" />
        <PurchasedProduct list={toPurchaseList} />
        <div className="line line__out" />
        <div className="title title__element">결제정보</div>
        <div className="line line__in" />{" "}
        <PurchasedInfo list={toPurchaseList} />
      </div>
      <PurchaseButtons />
    </div>
  );
};

export default Purchase;
