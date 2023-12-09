import { useSelector } from "react-redux";

const PurchasedInfo = ({ list }) => {
  const purchaseTotal = useSelector((state) => state.purchase.purchaseTotal);

  console.log(purchaseTotal);

  return (
    <div className="title title__element">
      <div className="flex flex__element-left">
        <div>총 상품 가격</div>
        <div>{purchaseTotal.totalPrice.toLocaleString()} 원</div>
      </div>
      <div className="flex flex__element-left">
        <div>배송비</div>
        <div>{purchaseTotal.totalDeliveryFee.toLocaleString()} 원</div>
      </div>
      <div className="flex flex__element-left">
        <div>총 결제금액</div>
        <div>
          {(
            purchaseTotal.totalPrice + purchaseTotal.totalDeliveryFee
          ).toLocaleString()}
          원
        </div>
      </div>
      <div className="flex flex__element-left">
        <div>총 바나나인덱스</div>
        <div>{purchaseTotal.totalBananaIndex / 100} </div>
      </div>
      <div className="flex flex__element-up">
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
