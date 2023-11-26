import { useSelector } from "react-redux";
import banana from "../../../assets/banana.png";
const CartsTotal = () => {
  //이건 선택된 cartCheckedList에서 계산된 결괏값
  const { totalPrice, totalDeliveryFee, totalBananaIndex } = useSelector(
    (state) => state.cart
  );

  return (
    <div className="cartsTotal__wrapper">
      <div className="cartsTotal">
        <div className="cartsTotal__description">
          <div>총 상품가격</div>
          <div>{totalPrice.toLocaleString()}원</div>
          <span className="material-symbols-outlined">add_circle</span>
          <div>배송비</div>
          <div>{totalDeliveryFee.toLocaleString()}원</div>
          <div>=</div>
          <div>주문금액 </div>
          <div>{(totalPrice + totalDeliveryFee).toLocaleString()}원</div>
        </div>
        <div className="cart__bananaIndex">
          <img src={banana} alt="bananaIndex" />
          <div className="cart__bananaIndexNum">
            x {totalBananaIndex.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartsTotal;
