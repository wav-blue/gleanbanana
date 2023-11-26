import ButtonCommon from "../../UI/ButtonCommon";
import InputCommon from "../../UI/InputCommon";
import banana from "../../../assets/banana.png";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/cart";

const ProductArticle = ({ product }) => {
  const { img, itemName, bananaIdx, itemPrice } = product;
  const [price, setPrice] = useState(itemPrice);
  const [bananaIndexes, setBananaIndexes] = useState(bananaIdx);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const onChangeNumHandler = (newValue) => {
    setQuantity(newValue);
  };

  //장바구니store에 수량과 함께 추가
  const addToCartHandler = () => {
    //api요청... 추가성공시 dispatch?
    //비동기로 리덕스는 할 수 없음
    //그러므로 thunk를 활용 해야 함(?)
    dispatch(
      cartActions.addToCart({
        ...product,
        quantity: quantity,
      })
    );

    // const data = {
    //   ...product,
    //   quantity: quantity,
    // };
    // addToCart(data);
  };

  useEffect(() => {
    setPrice(itemPrice * quantity);
    setBananaIndexes(bananaIdx * quantity);
  }, [itemPrice, bananaIdx, quantity]);

  return (
    <article className="product__article1">
      <img src={img} alt={itemName} />
      <section className="product__section">
        <h1>{itemName}</h1>
        <div className="product__bananaIndex">x{bananaIndexes.toFixed(2)}</div>
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
          <ButtonCommon design="medium" onClick={addToCartHandler}>
            장바구니 담기
          </ButtonCommon>
          <ButtonCommon design="medium">바로 구매하기</ButtonCommon>
        </section>
      </section>
    </article>
  );
};

export default ProductArticle;
