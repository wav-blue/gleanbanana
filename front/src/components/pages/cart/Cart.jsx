import { useState, useEffect } from "react";
import banana from "../../../assets/banana.png";
import InputCommon from "../../UI/InputCommon";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../../store/cart";
import InputCheckbox from "../../UI/InputCheckbox";
import useDebouncing from "../../../hooks/useDebouncing";
import useApi from "../../../hooks/useApi";
//선택된 제품만 total값과 bananaIndex값 변경되어야 함.
const Cart = ({ cart }) => {
  const [isChecked, setIsChecked] = useState(null);
  const [isFirst, setIsFirst] = useState(true);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [debouncedQuantity, setDebouncedQuantity] = useDebouncing({
    value: quantity,
    delay: 2000,
  });
  const [debouncedCheck, setDebouncedCheck] = useDebouncing({
    initialState: null,
    value: isChecked,
    delay: 2000,
  });
  //----------id부분 나중에 로그인기능 추가후 수정필!!!---------------
  const { trigger, result, reqIdentifier, loading, error } = useApi({
    method: "post",
    path: "/01HGB9HKEM19XHHB180VF2N8XT/carts",
    data: {},
    shouldInitFetch: false,
  });

  const onChangeNumHandler = (newValue) => {
    //유저의 눈에보이는건 바로, post요청은 딜레이
    setQuantity(newValue);
    setDebouncedQuantity(newValue);
  };

  //수량 변경시 바로 store cart에 추가 (화면 렌더링)
  useEffect(() => {
    dispatch(cartActions.changeQuantity({ item_id: cart.itemId, quantity }));
    !isFirst && dispatch(cartActions.updateTotal());
  }, [quantity, dispatch, cart.itemId]);

  //checkbox 변경시 isChecked변경
  const onChangeCheckhandler = (e) => {
    setIsFirst(false);
    console.log(isFirst);
    setIsChecked(e.target.checked);
  };

  //isChecked변경시 debouncedCheck변경
  useEffect(() => {
    setDebouncedCheck(isChecked);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChecked]);

  //debouncedCheck변경시 store checkedList에 추가
  //check되고 수량변경시 요청이 계속 가므로 debouncedQuantity
  //deps에 debouncedCheck만 변경될때만 trigger
  useEffect(() => {
    if (debouncedCheck) {
      dispatch(
        cartActions.addToCheckedList({ ...cart, quantity: debouncedQuantity })
      );
    } else if (!debouncedCheck) {
      //처음이 아닐때만 checkedList에서 빼기
      !isFirst && dispatch(cartActions.removeFromCheckedList(cart));
    }
  }, [debouncedCheck]);

  return (
    <article className="cart__wrapper">
      <div className="cart">
        <div className="cart__check">
          <InputCheckbox
            type="checkbox"
            id={cart.item_id}
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
          <InputCommon
            type="number"
            className="gray-square"
            value={cart.quantity}
            onValueChange={onChangeNumHandler}
          />
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
