import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ButtonCommon from "../../UI/ButtonCommon";
import { useNavigate } from "react-router-dom";
import { purchaseActions } from "../../../store/purchase";

const CartsButton = () => {
  const checkedList = useSelector((state) => state.cart.cartCheckedList);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  //구매하기 버튼 눌렀을 때 link를 Purchase로
  const onClickPurchase = async () => {
    if (checkedList.length === 0) return alert("선택된 제품이 없습니다.");
    dispatch(purchaseActions.storeToPurchase(checkedList));
    console.log(checkedList);
    navigate("/purchase");
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
