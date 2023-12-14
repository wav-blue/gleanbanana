import { useSelector } from "react-redux";
import banana from "../../../assets/banana.png";
import Plus from "../../icons/Plus";
import { useMemo } from "react";

const CartsTotal = () => {
  //cartCheckedList에서만 계산된 결괏값

  const cartCheckedList = useSelector((state) => state.cart.cartCheckedList);
  const { totalPrice, totalDeliveryFee, totalBananaIndex } = useMemo(
    () =>
      cartCheckedList.reduce(
        (acc, cur) => {
          return {
            totalPrice: acc.totalPrice + cur.price * cur.quantity,
            totalDeliveryFee: acc.totalDeliveryFee + 2500,
            totalBananaIndex:
              acc.totalBananaIndex + cur.banana_index * cur.quantity,
          };
        },
        { totalPrice: 0, totalDeliveryFee: 0, totalBananaIndex: 0 }
      ),
    [cartCheckedList]
  );
  const totalPurchase = totalDeliveryFee + totalPrice;

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
