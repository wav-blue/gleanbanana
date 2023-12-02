import { useState, useEffect, useCallback } from "react";
import banana from "../../../assets/banana.png";
import InputCommon from "../../UI/InputCommon";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../../store/cart";
import InputCheckbox from "../../UI/InputCheckbox";
import useDebouncing from "../../../hooks/useDebouncing";
import useApi from "../../../hooks/useApi";
const Cart = ({ cart }) => {
  const [isChecked, setIsChecked] = useState(false); //백checked 추가시 |cart.checked
  const [isFirst, setIsFirst] = useState(true);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  //----------id부분 나중에 로그인기능 추가후 수정필!!!---------------
  const { trigger, result, reqIdentifier, loading, error } = useApi({
    method: "post",
    path: "/01HGB9HKEM19XHHB180VF2N8XT/carts",
    data: {},
    shouldInitFetch: false,
  });
  const { debouncedValue } = useDebouncing({
    value: quantity,
    initialState: 0,
    delay: 2000,
  });
  const { debouncedValue: debouncedCheck } = useDebouncing({
    value: isChecked,
    initialState: false, // |cart.checked
    delay: 2000,
  });

  const onChangeNumHandler = useCallback((newValue) => {
    setQuantity(newValue);
  }, []);

  //수량 변경시 바로 store cart에 추가
  //trigger도??? 계속 간다 수정필... + 에러 Column 'item_id' cannot be null
  useEffect(() => {
    trigger({
      method: "post",
      path: `/01HGB9HKEM19XHHB180VF2N8XT/carts`,
      data: {
        item_id: cart.itemId,
        quantity,
      },
      applyResult: true,
      isShowBoundary: false,
    });
    dispatch(
      cartActions.changeQuantity({
        item_id: cart.itemId,
        quantity,
      })
    );
    !isFirst && dispatch(cartActions.updateTotal());
  }, [quantity, dispatch, cart.itemId, isFirst]);

  //checkbox 변경시 isChecked변경
  const onChangeCheckhandler = useCallback((e) => {
    setIsFirst(false);
    setIsChecked(e.target.checked);
  }, []);

  //debouncedCheck변경시 store checkedList에 추가
  //check되고 수량변경시 요청이 계속 가므로 debouncedValue??
  //총 가격 렌더링 너무느리다 그러나 요청은 debounced되어야한다..

  //deps에 debouncedCheck만 변경될때만 trigger
  //updateTotal
  useEffect(() => {
    if (debouncedCheck) {
      console.log("debounced checked!");
      dispatch(
        cartActions.addToCheckedList({ ...cart, quantity: debouncedValue })
      );
    } else if (!debouncedCheck) {
      console.log("debounced unChecked!");
      !isFirst && dispatch(cartActions.removeFromCheckedList(cart));
    }
    dispatch(cartActions.updateTotal());
  }, [cart, debouncedCheck, isFirst, dispatch, debouncedValue]);

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
