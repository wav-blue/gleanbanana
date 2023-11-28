import { useState } from "react";
import banana from "../../../assets/banana.png";
import InputCommon from "../../UI/InputCommon";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/cart";
import InputCheckbox from "../../UI/InputCheckbox";
const Cart = ({ cart }) => {
  //선택된 제품만 total값과 bananaIndex값 변경되어야 함.
  const [ischecked, setIsChecked] = useState(false);

  const dispatch = useDispatch();

  //api요청으로 가져온 cart와 그 수량을 보여줌 ... select쓸 필요 없음???

  const [quantity, setQuantity] = useState(cart.quantity);
  const onChangeNumHandler = (newValue) => {
    setQuantity(newValue);
  };

  //checked되면
  if (ischecked) {
    //total에 더함
    dispatch(cartActions.addToCheckedList(cart));
  } else {
    //total에서 뺌
    dispatch(cartActions.removeFromCheckedList(cart));
  }

  const onChangeCheckhandler = (e) => {
    setIsChecked((prev) => !prev);
    console.log(e.target.checked);
  };

  return (
    <article className="cart__wrapper">
      <div className="cart">
        <div className="cart__check">
          <InputCheckbox
            type="checkbox"
            id={cart.id}
            checked={ischecked}
            onChangeCheckhandler={(e) => onChangeCheckhandler(e)}
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
            value={cart.quantity}
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
