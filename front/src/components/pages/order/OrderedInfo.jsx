const OrderedInfo = () => {
  return (
    <div className="title title__element">
      <div className="flex flex__element-left">
        <div>총 상품 가격</div>
        <div>27,500원</div>
      </div>
      <div className="flex flex__element-left">
        <div>배송비</div>
        <div>5,000원</div>
      </div>
      <div className="flex flex__element-left">
        <div>총 결재금액</div>
        <div>32,500원</div>
      </div>
      <div className="flex flex__element-up">
        <div>결제 방법</div>
        <div>계좌이체</div>
      </div>
    </div>
  );
};

export default OrderedInfo;
