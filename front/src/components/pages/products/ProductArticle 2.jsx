import ButtonCommon from "../../UI/ButtonCommon";
import InputCommon from "../../UI/InputCommon";
import banana from "../../../assets/banana.png";
import { useState, useEffect } from "react";

const ProductArticle = ({ product }) => {
  const { img, itemName, bananaIdx, itemPrice } = product;
  const [price, setPrice] = useState(itemPrice);
  const [num, setNum] = useState(1);
  const onChangeNumHandler = (newValue) => {
    setNum(newValue);
  };

  useEffect(() => {
    setPrice(itemPrice * num);
  }, [itemPrice, num]);
  console.log(num);

  return (
    <article className="product__article1">
      <img src={img} alt={itemName} />
      <section className="product__section">
        <h1>{itemName}</h1>
        <div className="product__bananaIndex">x{bananaIdx}</div>
        <img src={banana} alt="bananaIndex" />
        <section className="product__section2">
          <div className="product__section2--input">
            <InputCommon
              type="number"
              className="gray-square"
              onValueChange={onChangeNumHandler}
            />
            <div className="product__section2--total">총 상품 금액</div>
          </div>
          <div className="product__section2--val">
            {Number(price).toLocaleString()}원
          </div>
        </section>
        <section className="product__section3--button">
          <ButtonCommon design="small">
            <span className="material-symbols-outlined">favorite</span>
          </ButtonCommon>
          <ButtonCommon design="medium">장바구니 담기</ButtonCommon>
          <ButtonCommon design="medium">바로 구매하기</ButtonCommon>
        </section>
      </section>
    </article>
  );
};

export default ProductArticle;
