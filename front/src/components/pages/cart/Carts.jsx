import Cart from "./Cart";
import CartsHeader from "./CartsHeader";
import CartsButton from "./CartsButton";
import CartsTotal from "./CartsTotal";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useApi from "../../../hooks/useApi";
import { cartActions } from "../../../store/cart";

const Carts = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { trigger, result, reqIdentifier, loading, error } = useApi({
    method: "get",
    path: "/01HGB9HKEM19XHHB180VF2N8XT/carts",
    data: {},
    shouldInitFetch: false,
  });

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
      console.log(result?.data);
      dispatch(cartActions.storeToCart(result?.data));
    }
  }, [result.data]);

  return (
    <div className="carts__wrapper">
      <div className="carts__header">
        <CartsHeader />
        {cartItems.map((cart, index) => (
          <Cart cart={cart} key={`carts-${index}`} />
        ))}
      </div>
      <CartsTotal />
      <CartsButton />
    </div>
  );
};

export default Carts;
