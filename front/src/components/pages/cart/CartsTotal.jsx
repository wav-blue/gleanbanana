import { useSelector } from "react-redux";
import banana from "../../../assets/banana.png";
import { useEffect } from "react";
import Plus from "../../icons/Plus";

const CartsTotal = () => {
  //이건 선택된 cartCheckedList에서 계산된 결괏값
  const { totalPrice, totalDeliveryFee, totalBananaIndex } = useSelector(
    (state) => state.cart.cartTotal
  );
  const totalPurchase = totalDeliveryFee + totalPrice;
  useEffect(() => {
    console.log("totalPrice ... etc");
    console.log(`${totalPrice}, ${totalDeliveryFee}, ${totalBananaIndex}`);
  }, [totalPrice, totalDeliveryFee, totalBananaIndex]);
  return (
    <div className="cartsTotal__wrapper">
      <div className="cartsTotal">
        <div className="cartsTotal__description">
          <div className="cartsTotal__price">
            <div>총 상품가격</div>
            <div>{totalPrice.toLocaleString()}원</div>
          </div>
          <Plus />
          <div className="cartsTotal__delivery">
            <div>배송비</div>
            <div>{totalDeliveryFee.toLocaleString()}원</div>
          </div>
          <div>=</div>
          <div className="cartsTotal__totalPrice">
            <div>주문금액 </div>
            <div>{totalPurchase.toLocaleString()}원</div>
          </div>
        </div>
        <div className="cart__bananaIndex">
          <img src={banana} alt="bananaIndex" />
          <div className="cart__bananaIndexNum">
            x {(totalBananaIndex / 100).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartsTotal;
