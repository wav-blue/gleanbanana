import Cart from "./Cart";
import CartsHeader from "./CartsHeader";
import CartsButton from "./CartsButton";
import CartsTotal from "./CartsTotal";
import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useApi from "../../../hooks/useApi";
import { cartActions } from "../../../store/cart";
import ButtonCommon from "../../UI/ButtonCommon";

const Carts = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartCheckedList = useSelector((state) => state.cart.cartCheckedList);
  const { trigger, result, reqIdentifier, loading, error } = useApi({
    method: "get",
    path: "/01HGB9HKEM19XHHB180VF2N8XT/carts",
    data: {},
    shouldInitFetch: false,
  });
  const checkedItemIdList = cartCheckedList.map((list) => list.item_id);

  // GET요청
  useEffect(() => {
    trigger({
      method: "get",
      path: `/01HGB9HKEM19XHHB180VF2N8XT/carts`,
      data: {},
      applyResult: true,
      isShowBoundary: true,
    });
  }, []);

  //result가 변하면 cart에 dispatch
  //store에 저장되어있는 것으로 cart화면 그려줌
  useEffect(() => {
    if (reqIdentifier === "getData") {
      console.log("data를 가져와서 dispatch합니다");
      console.log(reqIdentifier);
      console.log(result?.data);
      dispatch(cartActions.storeToCart(result?.data));
    }

    if (reqIdentifier === "deleteData") {
      console.log(reqIdentifier);
      dispatch(cartActions.removeFromCart(checkedItemIdList));
    }
  }, [result.data]);

  const onClickDelete = useCallback(() => {
    trigger({
      method: "delete",
      path: `/01HGB9HKEM19XHHB180VF2N8XT/carts`,
      data: checkedItemIdList,
      applyResult: true,
      isShowBoundary: true,
    });
  }, [checkedItemIdList]);

  return (
    <div className="carts__wrapper">
      <div className="carts__header">
        <CartsHeader />
        {cartItems.map((cart, index) => (
          <Cart cart={cart} key={`carts-${index}`} />
        ))}
      </div>
      <div className="carts__delButton">
        <ButtonCommon design="midsmall" onClick={onClickDelete}>
          선택 삭제하기
        </ButtonCommon>
      </div>
      <CartsTotal />
      <CartsButton />
    </div>
  );
};

export default Carts;
