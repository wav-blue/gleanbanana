import { useState, useEffect, useCallback, useMemo } from "react";
import banana from "../../../assets/banana.png";
import InputCommon from "../../UI/InputCommon";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../../store/cart";
import InputCheckbox from "../../UI/InputCheckbox";
import useDebouncing from "../../../hooks/useDebouncing";
import useApi from "../../../hooks/useApi";
const Cart = ({ cart }) => {
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false); //백checked 추가시 |cart.checked
  const [isFirst, setIsFirst] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isChanged, setIsChanged] = useState(false);
  const userId = useSelector((state) => state.user.userInfo);
  const { trigger, result, reqIdentifier, loading, error } = useApi({
    method: "post",
    path: `/${userId}/carts`,
    data: {},
    shouldInitFetch: false,
  });
  const { debouncedValue: debouncedQuantity } = useDebouncing({
    value: quantity,
    initialState: 0,
    delay: 2000,
  });
  const { debouncedValue: debouncedCheck } = useDebouncing({
    value: isChecked,
    initialState: false, // |cart.checked
    delay: 2000,
  });
  //cart는 수시로 변하므로 useMemo해야함
  const postCartData = useMemo(() => {
    const obj = {
      item_id: cart.item_id,
      quantity: debouncedQuantity,
    };
    return obj;
  }, [debouncedQuantity, cart.item_id]);

  const onChangeNumHandler = useCallback(
    (newValue) => {
      console.log("1. number 변경!!!");
      setIsFirst(false);
      setQuantity(newValue);
      //   !isFirst && dispatch(cartActions.updateCartQuantity());
    },
    [setQuantity, setIsFirst]
  );

  useEffect(() => {
    console.log(quantity, "2. quantity변경!");
  }, [quantity]);

  useEffect(() => {
    console.log(debouncedQuantity, "3. debouncedQuantity 변경!");
  }, [debouncedQuantity]);

  useEffect(() => {
    console.log(isChanged, "isChanged 변경@");
  }, [isChanged]);

  useEffect(() => {
    console.log(isFirst, "1.5 isFirst 변경!!!");
  }, [isFirst]);

  useEffect(() => {
    console.log(postCartData, "4. postCartData변경!!!");
  }, [postCartData]);

  //debouncedCheck, debouncedQuantity이 변경될때만 setIsChanged(true) => trigger checkedvalue
  useEffect(() => {
    !isFirst && setIsChanged(true);
  }, [debouncedQuantity, isFirst]);
  //debouncedCheck추가

  useEffect(() => {
    if (isChanged && !isFirst) {
      console.log("5.cart수량 변경 요청!");
      setIsChanged(false);
      trigger({
        method: "post",
        path: `/${userId}/carts`,
        data: postCartData,
        applyResult: true,
        isShowBoundary: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChanged, isFirst]);

  //checkbox 변경시 isChecked변경 deps확인
  const onChangeCheckhandler = useCallback((e) => {
    setIsFirst(false);
    setIsChecked(e.target.checked);
  }, []);

  //updateTotal
  useEffect(() => {
    if (isChecked) {
      dispatch(
        cartActions.addToCheckedList({ item_id: cart.item_id, quantity })
      );
    } else if (!isChecked) {
      !isFirst && dispatch(cartActions.removeFromCheckedList(cart.item_id));
    }
    !isFirst && dispatch(cartActions.updateTotal());
  }, [cart, isChecked, isFirst, dispatch, quantity]);

  return (
    <article className="cart__wrapper">
      <div className="cart">
        <div className="cart__check">
          <InputCheckbox
            type="checkbox"
            className="checkInput"
            id={cart.item_id}
            checked={isChecked}
            onChangeCheckhandler={onChangeCheckhandler}
          />
        </div>
        <img className="cart__img" src={cart.image_url} alt={cart.item_name} />
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
        </div>
        <div className="cart__description__val">
          {Number((cart.price * quantity).toFixed(2)).toLocaleString()}원
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
