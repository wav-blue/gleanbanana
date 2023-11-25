import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useApi from "../../../hooks/useApi";
import salad from "../../../assets/salad.png";
import InputCommon from "../../UI/InputCommon";
import ButtonCommon from "../../UI/ButtonCommon";
import ProductArticle from "./ProductArticle";
import ProductNav from "./ProductNav";

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
      <ProductArticle product={product} />
      <ProductNav />
    </div>
  );
};

export default Product;
