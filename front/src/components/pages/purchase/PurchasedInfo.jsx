const PurchasedInfo = () => {
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
      <div className="flex flex__element-left">
        <div>결제 방법</div>
        <div>
          <div>계좌이체 신용 체크카드 법인카드 휴대폰 무통장입금(가상계좌)</div>
          <div>
            <div>카드를 선택해주세요</div>
            <div>할부를 선택해주세요</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchasedInfo;
