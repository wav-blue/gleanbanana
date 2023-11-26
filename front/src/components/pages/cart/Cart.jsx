import { useEffect, useState } from "react";
import banana from "../../../assets/banana.png";
import InputCommon from "../../UI/InputCommon";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../../store/cart";
const Cart = ({ cart }) => {
  //선택된 제품만 total값과 bananaIndex값 변경되어야 함.
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();

  //가져왔을 때는 이미 quantity가 있는 상태이므로
  //redux에서 수량을 가져와서 보여줘야 함

  //지금 상품의 수량만 보여주는 로직 : createSelector로
  const cartQuantity = useSelector((state) =>
    state.cart.cartItems.filter((item) => item.id === cart.id)
  );

  const [quantity, setQuantity] = useState(cartQuantity);
  const onChangeNumHandler = (newValue) => {
    setQuantity(newValue);
  };
  const onValueChange = (val) => {
    setChecked(val);
  };

  //checked가 변하면
  //장바구니 주문 요청 목록에서 빼거나 더함
  useEffect(() => {
    if (checked) {
      //total에 더함
      dispatch(cartActions.addToCheckedList(cart));
    } else {
      //total에서 뺌
      dispatch(cartActions.removeFromCheckedList(cart));
    }
  }, [cart, checked]);
  console.log(`cart ${cart.id}  ` + checked);
  return (
    <article className="cart__wrapper">
      <div className="cart">
        <div className="cart__check">
          <InputCommon
            type="checkbox"
            id={cart.id}
            checked={checked}
            onValueChange={onValueChange}
          />
          <img src={cart.img} alt={cart.itemName} />
        </div>
        <div className="cart__description__wrapper">
          <div className="cart__description">
            <div className="cart__description-name">{cart.itemName}</div>
            <div className="cart__description-delivery">
              {cart.deliveryDate}에 도착예정
            </div>
          </div>
          <InputCommon
            type="number"
            className="gray-square"
            onValueChange={onChangeNumHandler}
          />
          <div className="cart__description__val">
            {Number((cart.itemPrice * quantity).toFixed(2)).toLocaleString()}원
          </div>
        </div>
        <div className="cart__bananaIndex">
          <img src={banana} alt="bananaIndex" />
          <div className="cart__bananaIndexNum">
            x{(cart.bananaIdx * quantity).toFixed(2)}
          </div>
        </div>
      </div>
    </article>
  );
};

export default Cart;
