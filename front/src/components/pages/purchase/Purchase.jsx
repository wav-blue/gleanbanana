//인증되지 않은 유저는 로그인 페이지로
import ConsumerInfo from "../purchase/ConsumerInfo";
import DeleveryInfo from "../purchase/DeleveryInfo";
import PurchasedProduct from "../purchase/PurchasedProduct";
import PurchasedInfo from "../purchase/PurchasedInfo";
import PurchaseButtons from "../purchase/PurchaseButtons";

const Purchase = () => {
  return (
    <div className="purchase__wrapper">
      <div className="purchase__info">
        <div className="title title__element">주문/결제</div>
        <div className="line line__hr-gray" />
        <div className="title title__element">구매자 정보</div>
        <div className="line line__hr-gray" />
        <ConsumerInfo />
        <div className="line line__hr-gray" />
        <div className="title title__element">배송 정보</div>
        <div className="line line__hr-gray" />
        <DeleveryInfo />
        <div className="line line__hr-gray" />
        <div className="title title__element">배송 물품 내역 (3)</div>
        <div className="line line__hr-gray" />
        <PurchasedProduct />
        <div className="line line__hr-gray" />
        <div className="title title__element">결제정보</div>
        <div className="line line__hr-gray" />
        <PurchasedInfo />
      </div>
      <PurchaseButtons />
    </div>
  );
};

export default Purchase;
