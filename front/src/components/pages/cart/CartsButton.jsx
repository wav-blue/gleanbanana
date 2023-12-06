import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ButtonCommon from "../../UI/ButtonCommon";
import useApi from "../../../hooks/useApi";
import { useNavigate } from "react-router-dom";
import { purchaseActions } from "../../../store/purchase";

const CartsButton = () => {
  const checkedList = useSelector((state) => state.cart.cartCheckedList);
  const userId = useSelector((state) => state.user.userInfo);
  const { trigger } = useApi({
    method: "post",
    path: `/${userId}/orders`,
    data: checkedList,
    shouldInitFetch: false,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //구매하기 버튼 눌렀을 때 link를 Purchase로
  //api 요청 YES
  useEffect(() => {
    console.log("checkedList 변경!", checkedList);
  }, [checkedList]);
  const onClickPurchase = async () => {
    if (checkedList.length === 0) return alert("선택된 제품이 없습니다.");
    await trigger({
      method: "post",
      path: `/${userId}/orders`,
      data: checkedList,
      applyResult: true,
      isShowBoundary: true,
    });
    dispatch(purchaseActions.storeToPurchase(checkedList));
    navigate("/");
  };

  return (
    <div className="carts__button">
      <ButtonCommon design="large" link="/home">
        계속 쇼핑하기
      </ButtonCommon>
      <ButtonCommon design="large" onClick={onClickPurchase}>
        구매하기
      </ButtonCommon>
    </div>
  );
};

export default CartsButton;
