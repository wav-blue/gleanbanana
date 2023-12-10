import { useNavigate } from "react-router-dom";
import ButtonCommon from "../../UI/ButtonCommon";
import { useDispatch, useSelector } from "react-redux";
import { purchaseActions } from "../../../store/purchase";
import useApi from "../../../hooks/useApi";
import { cartActions } from "../../../store/cart";

const PurchaseButtons = () => {
  //결제취소 버튼 눌렀을 때 구매내역에 있는 물품들 cart에서 삭제 요청
  //결제하기 버튼 눌렀을 때???
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userId);
  const toPurchaseList = useSelector((state) => state.purchase.toPurchaseList);

  const { trigger } = useApi({
    method: "post",
    path: `/${userId}/orders`,
    shouldInitFetch: false,
  });
  const onClickCancel = () => {
    dispatch(purchaseActions.clearPurchaseList());
    navigate("/home");
  };
  const purchaseListData = toPurchaseList.reduce(
    (acc, { item_id, quantity }) => {
      acc.toPurchaseData.push({
        item_id,
        quantity,
      });
      acc.deleteCheckIdList.push(item_id);

      return acc;
    },
    { toPurchaseData: [], deleteCheckIdList: [] }
  );
  console.log("Purchase list data:", purchaseListData);

  //idList : []
  const onClickPurchase = async () => {
    //order요청 보내기
    await trigger({
      data: {
        items: purchaseListData.toPurchaseData,
        pay_method: "creditcard",
      },
      applyResult: true,
      isShowBoundary: true,
    });
    //성공시 해당 아이템들 장바구니 목록 비우기 요청!!!!
    dispatch(purchaseActions.initializePurchaseList());
    await trigger({
      method: "delete",
      path: `/${userId}/cart`,
      data: { itemIdList: purchaseListData.deleteCheckIdList },
      applyResult: false,
      isShowBoundary: true,
    });
    dispatch(cartActions.removeAllFromCheckedList());
    navigate("/order");
  };
  return (
    <div className="purchase__button">
      <ButtonCommon design="large" onClick={onClickCancel}>
        결제 취소
      </ButtonCommon>
      <ButtonCommon design="large" onClick={onClickPurchase}>
        결제하기
      </ButtonCommon>
    </div>
  );
};

export default PurchaseButtons;
