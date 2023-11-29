import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useApi from "../../../hooks/useApi";
import salad from "../../../assets/salad.png";
import ProductNav from "./ProductNav";
import ProductDetail from "./ProductDetail";

//서버와 통신 전 더미 product

const Product = () => {
  const { id } = useParams();
  console.log(id);
  const [product, setProduct] = useState({});
  const { trigger, result, reqIdentifier, loading, error } = useApi({
    method: "get",
    path: "/items",
    data: {},
    shouldInitFetch: false,
  });

  //GET요청
  useEffect(() => {
    if (reqIdentifier !== "getData") return;
    trigger({
      method: "get",
      path: `/items/${id}`,
      data: {},
      applyResult: true,
      isShowBoundary: true,
      shouldSetError: true,
    });
  }, [reqIdentifier, id, trigger]);

  // RESULT가 변하면 세팅
  useEffect(() => {
    if (reqIdentifier !== "getData") return;
    setProduct(result.data?.product);
  }, [result.data, reqIdentifier]);

  //장바구니 담기 버튼 클릭시 alert창
  //장바구니에 담았습니다. 장바구니로 이동하시겠습니까?

  return (
    <div className="product__wrapper">
      <ProductDetail product={product} />
      <ProductNav />
    </div>
  );
};

export default Product;
