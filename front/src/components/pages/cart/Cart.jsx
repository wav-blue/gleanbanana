import { useState, useEffect, useCallback, useMemo } from "react";
import banana from "../../../assets/banana.png";
import InputCommon from "../../UI/InputCommon";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../../store/cart";
import InputCheckbox from "../../UI/InputCheckbox";
import useDebouncing from "../../../hooks/useDebouncing";
import useApi from "../../../hooks/useApi";
import InputNumber from "../../UI/InputNumber";
const Cart = ({ cart }) => {
  const dispatch = useDispatch();
  const {
    banana_index,
    checked,
    expected_delivery,
    image_url,
    item_id,
    item_name,
    price,
    quantity,
  } = cart;
  const userId = useSelector((state) => state.user.userId);
  const [isFirst, setIsFirst] = useState(true);
  const [isChanged, setIsChanged] = useState(false);
  const [isChecked, setIsChecked] = useState(checked);
  const [changedQuantity, setChangedQuantity] = useState(quantity);
  const { trigger, result, reqIdentifier, loading, error } = useApi({
    method: "post",
    path: `/${userId}/carts`,
    data: {},
    shouldInitFetch: false,
  });
  const { debouncedValue: debouncedQuantity } = useDebouncing({
    value: changedQuantity,
    initialState: 0,
    delay: 2000,
  });
  const { debouncedValue: debouncedCheck } = useDebouncing({
    value: isChecked,
    initialState: checked,
    delay: 2000,
  });

  //============STATE CHANGED================
  //debounced state -> trigger
  useEffect(() => {
    !isFirst && setIsChanged(true);
  }, [debouncedQuantity, debouncedCheck, isFirst]);

  useEffect(() => {
    dispatch(cartActions.updateTotal());
  }, [changedQuantity, isChecked, dispatch]);

  //==========Change NUMBER ============
  //quantity변경시 id와 quantity

  const onChangeNumHandler = useCallback(
    (newValue) => {
      const updatedQuantityData = {
        item_id: item_id,
        quantity: newValue,
      };

      setIsFirst(false);
      setChangedQuantity(newValue);
      !isFirst && dispatch(cartActions.updateCartQuantity(updatedQuantityData));
    },
    [setChangedQuantity, setIsFirst, dispatch, isFirst]
  );

  //==========CHECKBOX 변경===============
  //checkbox 변경시 isChecked변경 deps확인
  //이벤트는 deps안넣어도 되는듯?
  const onChangeCheckhandler = useCallback((e) => {
    setIsFirst(false);
    setIsChecked(e.target.checked);
  }, []);
  //checkbox변경시 updateTotal, addToCheckedList
  //remove는 한개씩만 뺄수있음. check버튼

  //checkedCartData는
  //check상태 포함 각state 변경이 될 때마다 변경.
  const checkedCartData = useMemo(() => {
    return {
      ...cart,
      quantity: changedQuantity,
    };
  }, [cart, changedQuantity]);

  useEffect(() => {
    if (isChecked) {
      dispatch(cartActions.addToCheckedList(checkedCartData));
    } else if (!isChecked) {
      !isFirst && dispatch(cartActions.removeFromCheckedList(item_id));
    }
  }, [isChecked]);

  //============PUT요청================
  //PUT cart에 날릴 데이터. item_id와 quantity, checked
  //cart는 수시로 변하므로 useMemo해야함, debounced된 값을 보냄
  const postCartData = useMemo(() => {
    const obj = {
      item_id: item_id,
      quantity: debouncedQuantity,
      checked: debouncedCheck,
    };
    return obj;
  }, [debouncedQuantity, debouncedCheck, item_id]);

  useEffect(() => {
    if (isChanged && !isFirst) {
      console.log("cart수량 및 checked상태 변경 요청!");
      setIsChanged(false);
      trigger({
        method: "put",
        path: `/${userId}/carts`,
        data: postCartData,
        applyResult: true,
        isShowBoundary: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChanged, isFirst]);

  return (
    <article className="cart__wrapper">
      <div className="cart">
        <div className="cart__check">
          <InputCheckbox
            id={item_id}
            checked={isChecked}
            onChangeCheckhandler={onChangeCheckhandler}
          />
        </div>
        <img className="cart__img" src={image_url} alt={item_name} />
        <div className="cart__description__wrapper">
          <div className="cart__description">
            <div className="cart__description-name">{item_name}</div>
            <div className="cart__description-delivery">
              {expected_delivery}에 도착예정
            </div>
          </div>
          <InputNumber
            value={changedQuantity}
            onValueChange={onChangeNumHandler}
          />
        </div>
        <div className="cart__description__val">
          {Number((price * changedQuantity).toFixed(2)).toLocaleString()}원
        </div>
        <div className="cart__bananaIndex">
          <img src={banana} alt="bananaIndex" />
          <div className="cart__bananaIndexNum">
            x{((banana_index / 100) * changedQuantity).toFixed(2)}
          </div>
        </div>
      </div>
    </article>
  );
};

export default Cart;
