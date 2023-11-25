import ButtonCommon from "../../UI/ButtonCommon";

const PurchaseButtons = () => {
  //결제취소 버튼 눌렀을 때 구매내역에 있는 물품들 cart에서 삭제 요청
  //결제하기 버튼 눌렀을 때???
  return (
    <div className="purchase__button">
      <ButtonCommon design="large" link="/home">
        결제 취소
      </ButtonCommon>
      <ButtonCommon design="large" link="/purchase">
        결제하기
      </ButtonCommon>
    </div>
  );
};

export default PurchaseButtons;
