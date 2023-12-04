import { useSelector } from "react-redux";
import { useEffect } from "react";
import ButtonCommon from "../../UI/ButtonCommon";
import useApi from "../../../hooks/useApi";

const CartsButton = () => {
  const checkedList = useSelector((state) => state.cart.cartCheckedList);
  const { trigger } = useApi({
    method: "post",
    path: `/01HGB9HKEM19XHHB180VF2N8XT/orders`,
    data: checkedList,
    shouldInitFetch: false,
  });
  //구매하기 버튼 눌렀을 때 link를 Purchase로
  //api 요청 YES
  useEffect(() => {
    console.log("checkedList 변경!", checkedList);
  }, [checkedList]);
  const onClickPurchase = async () => {
    if (checkedList.length === 0) return alert("선택된 제품이 없습니다.");
    trigger({
      method: "post",
      path: `/01HGB9HKEM19XHHB180VF2N8XT/orders`,
      data: checkedList,
      applyResult: true,
      isShowBoundary: true,
    });
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
