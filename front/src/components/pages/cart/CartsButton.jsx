import { useDispatch, useSelector } from "react-redux";
import ButtonCommon from "../../UI/ButtonCommon";
import useApi from "../../../hooks/useApi";

//구매하기 버튼
//선택된 것이 없으면
//alert "한개 이상 선택해주세요"

const CartsButton = () => {
  const dispatch = useDispatch();
  const { trigger } = useApi({
    method: "get",
    path: "",
    data: {},
    shouldInitFetch: false,
  });
  const checkedList = useSelector((state) => state.cart.cartCheckedList);
  //구매하기 버튼 눌렀을 때
  //link를 Purchase로 보내줘야 하며
  //해당 컴포넌트에서 Cart의 목록을 가져옴...? NO api또 요청함? YES
  //코치님 피드백에 따르면 cart의 아이템들의 상태를 최신으로 관리해 주어야 하므로
  //api요청을 하는 것이 맞다.
  //실제 고객의 지출로 이어지는 것이므로 신뢰성 보장필수의 의미일듯.

  const onClickPurchase = async () => {
    if (checkedList.length === 0) return alert("선택된 제품이 없습니다.");
    await trigger({
      method: "post",
      path: "user/login",
      data: checkedList,
      applyResult: true,
      isShowBoundary: false,
      shouldSetError: false,
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
