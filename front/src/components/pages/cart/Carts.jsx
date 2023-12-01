import Cart from "./Cart";
import CartsHeader from "./CartsHeader";
import CartsButton from "./CartsButton";
import CartsTotal from "./CartsTotal";
import { useEffect, useCallback } from "react";
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
  const memoizedGetCarts = useCallback(async () => {
    await trigger({
      method: "get",
      path: `/01HGB9HKEM19XHHB180VF2N8XT/carts`,
      data: {},
      applyResult: true,
      isShowBoundary: false,
    });
  }, [trigger]);
  useEffect(() => {
    memoizedGetCarts();
  }, [memoizedGetCarts]);

  //result가 변하면 cart에 dispatch
  useEffect(() => {
    reqIdentifier === "getData" && dispatch(cartActions.addToCart(result.data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
