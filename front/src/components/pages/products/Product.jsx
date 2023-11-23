import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useApi from "../../../hooks/useApi";
import banana from "../../../assets/banana.png";
import salad from "../../../assets/salad.png";
import InputCommon from "../../UI/InputCommon";
import ButtonCommon from "../../UI/ButtonCommon";

//서버와 통신 전 더미 product

const product = {
  id: 2,
  img: salad,
  itemName: "팜에이트 무농약 유러피안 샐러드 꾸러미",
  itemPrice: 21560,
  bananaIdx: 2.38,
  deliveryDate: "2023-11-25",
  deliveryFee: 0,
};

const Product = () => {
  const { id } = useParams();
  console.log(id);
  // const [product, setProduct] = useState({})
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

  // RESULT가 변하면 세팅
  //   useEffect(() => {
  // if(reqIdentifier !== 'getData') return;
  //    setProduct(result.data?.project)
  //   }, [result.data, reqIdentifier]);

  //장바구니 담기 버튼 클릭시 alert창
  //장바구니에 담았습니다. 장바구니로 이동하시겠습니까?

  return (
    <div className="product__wrapper">
      <article className="product__article1">
        <img src={product.img} alt={product.itemName} />
        <section className="product__section">
          <h1>{product.itemName}</h1>
          <div className="product__bananaIndex">x{product.bananaIdx}</div>
          <img src={banana} alt="bananaIndex" />
          <section className="product__section2">
            <div className="product__section2--input">
              <InputCommon type="number" className="gray-square" />
              <div className="product__section2--total">총 상품 금액</div>
            </div>
            <div className="product__section2--val">
              {Number(product.itemPrice).toLocaleString()}원
            </div>
          </section>
          <section className="product__section3--button">
            <ButtonCommon design="small">
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
