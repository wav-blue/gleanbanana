import { useState, useEffect } from "react";
import banana from "../../../assets/banana.png";
import InputCommon from "../../UI/InputCommon";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../../store/cart";
import InputCheckbox from "../../UI/InputCheckbox";
import useDebouncing from "../../../hooks/useDebouncing";
//선택된 제품만 total값과 bananaIndex값 변경되어야 함.
const Cart = ({ cart }) => {
  const [isChecked, setIsChecked] = useState(null);
  const [isFirst, setIsFirst] = useState(true);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const { debouncedQuantity } = useDebouncing({
    value: quantity,
    delay: 2000,
  });
  const onChangeNumHandler = (newValue) => {
    setQuantity(newValue);
  };

  useEffect(() => {
    dispatch(
      cartActions.changeQuantity({ id: cart.id, quantity: debouncedQuantity })
    );
    dispatch(cartActions.updateTotal());
  }, [debouncedQuantity, dispatch, cart.id]);

  //onChangeCheckHandler를 useCallback의 callback함수에 넣으려면...   //useRef?
  //checkbox 변경시
  const onChangeCheckhandler = (e) => {
    setIsFirst(false);
    console.log(isFirst);
    //checked되었을 때
    if (e.target.checked) {
      dispatch(
        cartActions.addToCheckedList({ ...cart, quantity: debouncedQuantity })
      );
    } else {
      console.log("e target unChecked!");
      !isFirst && dispatch(cartActions.removeFromCheckedList(cart));
    }
    dispatch(cartActions.updateTotal());
    setIsChecked((prev) => !prev);
  };
  return (
    <article className="cart__wrapper">
      <div className="cart">
        <div className="cart__check">
          <InputCheckbox
            type="checkbox"
            id={cart.id}
            checked={isChecked}
            onChangeCheckhandler={onChangeCheckhandler}
          />
          <img src={cart.image_url} alt={cart.item_name} />
        </div>
        <div className="cart__description__wrapper">
          <div className="cart__description">
            <div className="cart__description-name">{cart.item_name}</div>
            <div className="cart__description-delivery">
              {cart.expected_delivery}에 도착예정
            </div>
          </div>
          {isFirst && (
            <InputCommon
              type="number"
              className="gray-square"
              value={cart.quantity}
              onValueChange={onChangeNumHandler}
            />
          )}
          {!isFirst && (
            <InputCommon
              type="number"
              className="gray-square"
              value={cart.debouncedQuantity}
              onValueChange={onChangeNumHandler}
            />
          )}
          <div className="cart__description__val">
            {Number((cart.price * quantity).toFixed(2)).toLocaleString()}원
          </div>
        </div>
        <div className="cart__bananaIndex">
          <img src={banana} alt="bananaIndex" />
          <div className="cart__bananaIndexNum">
            x{((cart.banana_index / 100) * quantity).toFixed(2)}
          </div>
        </div>
      </div>
    </article>
  );
};

export default Cart;
