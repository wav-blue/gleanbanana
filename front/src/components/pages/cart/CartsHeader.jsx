import InputCommon from "../../UI/InputCommon";

const CartsHeader = () => {
  return (
    <div className="carts__header__wrapper">
      <div>장바구니</div>
      <hr />
      <div className="carts__category__wrapper">
        <div className="carts__category">
          <div className="carts__check">
            <InputCommon type="checkbox" />
            <div>전체선택</div>
          </div>
          <div className="carts__category__info">상품정보</div>
          <div className="carts__category__val">금액</div>
          <div className="carts__category__index">바나나인덱스</div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default CartsHeader;
