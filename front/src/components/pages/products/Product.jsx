import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useApi from "../../../hooks/useApi";
import banana from "../../../assets/banana.png";
import peanut from "../../../assets/peanut.png";
import InputCommon from "../../UI/InputCommon";
import ButtonCommon from "../../UI/ButtonCommon";

//서버와 통신 전 더미 product

const product = {
  id: 7,
  img: peanut,
  productName: "맛을 그리다 볶음 땅콩 알땅콩 1kg 23년 햇땅콩",
  productPrice: "9,600",
  bananaIdx: 3.6,
};

const Product = () => {
  const { id } = useParams();
  console.log(id);
  //   const { trigger, result, reqIdentifier, loading, error } = useApi({
  //     method: "get",
  //     path: "/items",
  //     data: {},
  //     shouldInitFetch: false,
  //   });

  //GET요청
  //   useEffect(() => {
  // if(reqIdentifier !== 'getData') return;
  //     trigger({
  //   method: 'get',
  //   path: `/items/${id}`,
  //   data: {},
  //   applyResult : true,
  //   isShowBoundary : true,
  //   shouldSetError : true,
  // });
  //   }, []);

  return (
    <div className="product__wrapper">
      <article className="product__article1">
        <img src={product.img} alt={product.productName} />
        <section className="product__section">
          <h1>{product.productName}</h1>
          <div className="product__bananaIndex">x{product.bananaIdx}</div>
          <img src={banana} alt="bananaIndex" />
          <section className="product__section2">
            <div className="product__section2--input">
              <InputCommon type="number" className="gray-square" />
              <div className="product__section2--total">총 상품 금액</div>
            </div>
            <div className="product__section2--val">9900원</div>
          </section>
          <section className="product__section3--button">
            <ButtonCommon design="middle">
              <span class="material-symbols-outlined">favorite</span>
            </ButtonCommon>
            <ButtonCommon design="medium">장바구니 담기</ButtonCommon>
            <ButtonCommon design="medium">바로 구매하기</ButtonCommon>
          </section>
        </section>
      </article>
      <article className="product__article2">
        <section className="product__section4">
          <ButtonCommon design="large">상품상세</ButtonCommon>
          <ButtonCommon design="large">상품평</ButtonCommon>
          <ButtonCommon design="large">상품문의</ButtonCommon>
        </section>
      </article>
      <article className="product__article3">
        <section className="product__section5">
          <div className="product__section5--photo">상품 상세 사진 </div>
        </section>
        <div className="product__section5--button">
          <ButtonCommon design="medium">더보기</ButtonCommon>
        </div>
      </article>
    </div>
  );
};

export default Product;
