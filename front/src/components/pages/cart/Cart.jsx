import { useState, useEffect } from "react";
import banana from "../../../assets/banana.png";
import InputCommon from "../../UI/InputCommon";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../../store/cart";
import InputCheckbox from "../../UI/InputCheckbox";
import useDebouncing from "../../../hooks/useDebouncing";
const Cart = ({ cart }) => {
  //선택된 제품만 total값과 bananaIndex값 변경되어야 함.
  const [isChecked, setIsChecked] = useState(null);
  const [isFirst, setIsFirst] = useState(true);
  const cartCheckedList = useSelector((state) => state.cart.cartCheckedList);

  const dispatch = useDispatch();

  //api요청으로 가져온 cart와 그 수량을
  //dispatch해줌...
  //그것을 가져옴!!! thunk가 필요 ㅠ_ㅠ????

  const [quantity, setQuantity] = useState(1);
  const { debouncedQuantity } = useDebouncing({
    value: quantity,
    delay: 2000,
  });
  const onChangeNumHandler = (newValue) => {
    setQuantity(newValue);
  };

  //number변경시
  useEffect(() => {
    //quantity가 계속 변경이 되는데 특정 시간까지 (2초) 기다렸다가
    //quantity를 넣어 dispatch를 실행해야함.

    //커스텀훅은 상태값을 변경해줌

    dispatch(cartActions.changeQuantity({ id: cart.id, debouncedQuantity }));
    dispatch(cartActions.updateTotal());
  }, [debouncedQuantity, dispatch, cart.id]);

  useEffect(() => {
    console.log(cartCheckedList);
  }, [cartCheckedList]);

  //onChangeCheckHandler를 useCallback의 callback함수에 넣으려면...   //useRef?
  //checkbox 변경시
  const onChangeCheckhandler = (e) => {
    setIsFirst(false);
    console.log(isFirst);
    //checked되었을 때
    if (e.target.checked) {
      console.log("e target checked!");
      dispatch(cartActions.addToCheckedList({ id: cart.id, quantity }));
    } else {
      console.log("e target unchecked!");
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
            onChangeCheckhandler={(e) => onChangeCheckhandler(e)}
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
            x{(cart.banana_index * quantity).toFixed(2)}
          </div>
        </div>
      </div>
    </article>
  );
};

export default Cart;
