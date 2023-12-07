//인증되지 않은 유저는 로그인 페이지로
import ConsumerInfo from "../purchase/ConsumerInfo";
import DeleveryInfo from "../purchase/DeleveryInfo";
import PurchasedProduct from "../purchase/PurchasedProduct";
import PurchasedInfo from "../purchase/PurchasedInfo";
import PurchaseButtons from "../purchase/PurchaseButtons";
import { useSelector } from "react-redux";
import { useEffect } from "react";

//구매하기 전 페이지
const Purchase = () => {
  const toPurchaseList = useSelector((state) => state.purchase.toPurchaseList);
  const toPurchaseListLength = useSelector(
    (state) => state.purchase.toPurchaseListLength
  );

  useEffect(() => {
    console.log(toPurchaseList);
  }, []);
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
        <DeleveryInfo />
        <div className="line line__out" />
        <div className="title title__element">
          {`배송 물품 내역 (${toPurchaseListLength})`}
        </div>
        <div className="line line__in" />
        {toPurchaseList.map((list) => (
          <PurchasedProduct item_name={list.item_name} />
        ))}
        <div className="line line__out" />
        <div className="title title__element">결제정보</div>
        <div className="line line__in" />
        {toPurchaseList.map((list) => (
          <PurchasedInfo list={list} />
        ))}
      </div>
      <PurchaseButtons />
    </div>
  );
};

export default Purchase;
