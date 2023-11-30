import Cart from "./Cart";
import CartsHeader from "./CartsHeader";
import CartsButton from "./CartsButton";
import CartsTotal from "./CartsTotal";
import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import useApi from "../../../hooks/useApi";
import axios from "axios";
import { cartActions } from "../../../store/cart";

const Carts = () => {
  //다른곳에서 store에있는 cart가 변경되면?
  //안되니까 결국 store에 있는 cart로 가져와야 겠구만
  const cartItems = useSelector((state) => state.cart.cartItems);
  console.log("cartItems", cartItems);
  const dispatch = useDispatch();
  // const { trigger, result, reqIdentifier, loading, error } = useApi({
  //   method: "get",
  //   path: "/cart", //확인필요
  //   data: {},
  //   shouldInitFetch: false,
  // });

  // GET요청
  const memoizedGetCarts = useCallback(async () => {
    // trigger({
    //   method: "get",
    //   path: `/carts`,
    //   data: {},
    //   applyResult: true,
    //   isShowBoundary: true,
    //   shouldSetError: true,
    // });
    const fetchedCarts = await axios.get(
      "/api/user/01HGB9HKEM19XHHB180VF2N8XT/carts/"
    );
    dispatch(cartActions.addToCart(fetchedCarts));
  }, [dispatch]);

  // carts가 변경되면 서버와 통신하여 해당 데이터들을 가져옴
  useEffect(() => {
    // memoizedGetCarts();
  }, [cartItems, memoizedGetCarts]);

  // RESULT가 변하면 세팅 useApi사용할때
  // useEffect(() => {
  //   if (reqIdentifier !== "getData") return;
  //   setCarts(result.data?.cart);
  // }, [result.data, reqIdentifier]);

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
