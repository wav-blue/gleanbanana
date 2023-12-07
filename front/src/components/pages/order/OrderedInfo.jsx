const OrderedInfo = ({ orderInfo }) => {
  const total_purchase = orderInfo.total_price + orderInfo.delivery_fee;
  return (
    <div className="title title__element">
      <div className="flex flex__element-left">
        <div>총 상품 가격</div>
        <div>{orderInfo.total_price}</div>
      </div>
      <div className="flex flex__element-left">
        <div>배송비</div>
        <div>{orderInfo.delivery_fee}</div>
      </div>
      <div className="flex flex__element-left">
        <div>총 결재금액</div>
        <div>{total_purchase}</div>
      </div>
      <div className="flex flex__element-up">
        <div>결제 방법</div>
        <div>{orderInfo.pay_method}</div>
      </div>
    </div>
  );
};

export default OrderedInfo;
