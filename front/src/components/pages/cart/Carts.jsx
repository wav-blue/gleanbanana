import Cart from "./Cart";
import CartsHeader from "./CartsHeader";
import CartsButton from "./CartsButton";
import CartsTotal from "./CartsTotal";
import { useCallback, useEffect } from "react";
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

  useEffect(() => {
    dispatch(cartActions.removeAllFromCheckedList());
  }, []);

  const { trigger, result, reqIdentifier } = useApi({
    method: "get",
    path: `/${userId}/carts`,
    data: {},
    shouldInitFetch: false,
  });
  const checkedItemIdList = cartCheckedList.map((list) => list.item_id);

  // GET요청
  useEffect(() => {
    userId &&
      trigger({
        applyResult: true,
        isShowBoundary: true,
      });
  }, [userId]);

  //비로그인 유저의 cartItems가져오기
  useEffect(() => {
    if (!userId) {
      //localStorage에서 가져와서 storeToCart하기
      const localCartItems = localStorage.getItem("cartItems");
      dispatch(cartActions.storeToCart(JSON.parse(localCartItems)));
      console.log(localCartItems);
      return;
    }
  }, [userId, dispatch]);

  //result가 변하면 cart에 dispatch
  //store에 저장되어있는 것으로 cart화면 그려줌
  //result.data가 deps에 필요?

  useEffect(() => {
    if (reqIdentifier === "getData") {
      dispatch(cartActions.storeToCart(result?.data));
    }

    if (reqIdentifier === "deleteData") {
      dispatch(cartActions.removeFromCart(checkedItemIdList));
    }
  }, [reqIdentifier, result?.data, dispatch, userId]);

  //itemIdList중 삭제할 id들만 넣어줘야함
  //삭제 요청 뒤, result가 변경되면 UI를 변경해줘야함
  const onClickDelete = useCallback(() => {
    //비로그인 유저일 경우 localStorage를 삭제후 다시 저장
    userId &&
      trigger({
        method: "delete",
        path: `/${userId}/cart`,
        data: { itemIdList: checkedItemIdList },
        applyResult: true,
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
