import ConsumerInfo from "../purchase/ConsumerInfo";
import DeliveryInfo from "../purchase/DeliveryInfo";
import OrderedProduct from "../order/OrderedProduct";
import OrderedInfo from "../order/OrderedInfo";

const OrderedDetail = () => {
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
        <OrderedProduct />
        <div className="line line__out" />
        <div className="title title__element">결제정보</div>
        <div className="line line__in" />
        <OrderedInfo />
      </div>
    </div>
  );
};

export default OrderedDetail;
