import Cart from "./Cart";
import CartsHeader from "./CartsHeader";
import CartsButton from "./CartsButton";
import CartsTotal from "./CartsTotal";
import { Suspense, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useApi from "../../../hooks/useApi";
import { cartActions } from "../../../store/cart";
import ButtonCommon from "../../UI/ButtonCommon";
import { useNavigate } from "react-router-dom";
import useConfirm from "../../../hooks/useConfirm";

const Carts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.user.userId);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartCheckedList = useSelector((state) => state.cart.cartCheckedList);

  const toLogin = () => {
    navigate("/login");
  };
  const toHome = () => {
    navigate("/home");
  };
  const onConfirm = useConfirm(
    "로그인된 유저만 사용가능합니다!",
    toLogin,
    toHome
  );

  useEffect(() => {
    if (!userId) {
      onConfirm();
    }
  }, [userId]);

  const { trigger, result, reqIdentifier, loading, error } = useApi({
    method: "get",
    path: `/${userId}/carts`,
    data: {},
    shouldInitFetch: false,
  });
  const checkedItemIdList = cartCheckedList.map((list) => list.item_id);
  console.log(checkedItemIdList);
  let fetchedData;

  const getData = async () => {
    fetchedData = await trigger({
      applyResult: true,
      isShowBoundary: true,
    });
  };

  // GET요청
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (reqIdentifier !== " getData") return;
    if (reqIdentifier === "getData" && fetchedData && !loading) {
      console.log("delete성공하여 storeToCart redux###@@@");
      dispatch(cartActions.storeToCart(fetchedData));
    }
  }, [dispatch, fetchedData, reqIdentifier, loading]);
  //result가 변하면 cart에 dispatch
  //store에 저장되어있는 것으로 cart화면 그려줌
  //result.data가 deps에 필요?
  //dispatch or result.data를 안하면 작동 안됨 ㅜ_ㅠ
  //result가 변경되기 전에 reqIdentifier가 한번 작동을해서 그다음엔 작동안해서그런듯
  useEffect(() => {
    if (reqIdentifier === "getData" && result.data) {
      console.log("delete성공하여 storeToCart redux###@@@");
      dispatch(cartActions.storeToCart(result?.data));
    }

    if (reqIdentifier === "deleteData" && result.data) {
      console.log("delete성공하여 removeFromCart redux###@@@");
      dispatch(cartActions.removeFromCart(checkedItemIdList));
    }
  }, [reqIdentifier, result?.data, dispatch]);

  useEffect(() => {
    console.log(cartItems, "cartItems변경");
  }, [cartItems]);

  //itemIdList중 삭제할 id들만 넣어줘야함
  //삭제 요청 뒤, result가 변경되면 UI를 변경해줘야함
  const onClickDelete = useCallback(() => {
    trigger({
      method: "delete",
      path: `/${userId}/cart`,
      data: { itemIdList: checkedItemIdList },
      applyResult: false,
      isShowBoundary: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedItemIdList, userId]);

  return (
    <div className="carts__wrapper">
      <div className="carts__header">
        <CartsHeader />
        {Array.isArray(cartItems) &&
          cartItems?.map((cart, index) => (
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
