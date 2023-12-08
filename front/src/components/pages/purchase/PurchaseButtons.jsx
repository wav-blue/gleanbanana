import { useNavigate } from "react-router-dom";
import ButtonCommon from "../../UI/ButtonCommon";
import { useDispatch, useSelector } from "react-redux";
import { purchaseActions } from "../../../store/purchase";
import useApi from "../../../hooks/useApi";

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

  //idList : []
  const onClickPurchase = async () => {
    //order요청 보내기
    console.log(toPurchaseList);
    const purchaseListData = toPurchaseList.reduce(
      ({ toPurchaseData, deleteCheckIdList }, { item_id, quantity }) => {
        toPurchaseData.push({
          item_id,
          quantity,
        });
        deleteCheckIdList.push(item_id);
        return { toPurchaseData, deleteCheckIdList };
      },
      { toPurchaseData: [], deleteCheckIdList: [] }
    );
    console.log(purchaseListData);
    await trigger({
      data: {
        items: purchaseListData.toPurchaseData,
        pay_method: "creditcard",
      },
      applyResult: true,
      isShowBoundary: true,
    });
    //장바구니 목록 비우기
    //지우는 요청!!!!
    //purchaseList
    await trigger({
      method: "delete",
      path: `/${userId}/cart`,
      data: { itemIdList: purchaseListData.deleteCheckIdList },
      applyResult: false,
      isShowBoundary: true,
    });
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
