import Cart from "./Cart";
import CartsHeader from "./CartsHeader";
import CartsButton from "./CartsButton";
import CartsTotal from "./CartsTotal";
import { useState } from "react";
import { useSelector } from "react-redux";

const Carts = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  // const [carts, setCarts] = useState([]);
  //   const { trigger, result, reqIdentifier, loading, error } = useApi({
  //     method: "get",
  //     path: "/cart", //확인필요
  //     data: {},
  //     shouldInitFetch: false,
  //   });

  //carts가 변경되면 서버와 통신하여 해당 데이터들을 가져옴
  // useEffect(()=>{
  //  trigger({
  //   method: 'get',
  //   path: `/cart/${id}`,
  //   data: {},
  //   applyResult : true,
  //   isShowBoundary : true,
  //   shouldSetError : true,
  // })}, [carts])

  //GET요청
  //   useEffect(() => {
  // if(reqIdentifier !== 'getData') return;
  //     trigger({
  //   method: 'get',
  //   path: `/cart/${id}`,
  //   data: {},
  //   applyResult : true,
  //   isShowBoundary : true,
  //   shouldSetError : true,
  // });
  //   }, []);

  // RESULT가 변하면 세팅
  //   useEffect(() => {
  // if(reqIdentifier !== 'getData') return;
  //    setCarts(result.data?.cart)
  //   }, [result.data, reqIdentifier]);

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
