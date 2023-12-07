import { useState } from "react";
import InputCommon from "../../UI/InputCommon";
import InputCheckbox from "../../UI/InputCheckbox";

const CartsHeader = () => {
  const [checked, setChecked] = useState(false);
  //checkAll 기능 구현이 필요하다

  return (
    <div className="carts__header__wrapper">
      <div className="carts__head">장바구니</div>
      <hr />
      <div className="carts__category__wrapper">
        <div className="carts__category">
          <div className="carts__check">
            <InputCheckbox id="cartsHeader" checked={checked} checkAll={true} />
          </div>
          <div className="carts__checkAll">전체선택</div>
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
