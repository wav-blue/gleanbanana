// import { useEffect, useState } from "react";
// import useApi from "../../../hooks/useApi";
// import Product from "./Product";
// import Card from "../../UI/Card";
import ProductCard from "./ProductCard";
import tomato from "../../../assets/tomato.png";
import salad from "../../../assets/salad.png";
import peanut from "../../../assets/peanut.png";
import oats from "../../../assets/oats.png";
import banana from "../../../assets/banana.png";
import Categories from "../home/Categories";
import { Link, useNavigate } from "react-router-dom";

//서버 통신 전 더미 products
const products = [
  {
    id: 1,
    img: tomato,
    recommendationName: "대추방울토마토",
    recommendationPrice: "20,020",
    bananaIdx: 2.59,
  },
  {
    id: 2,
    img: salad,
    recommendationName: "팜에이트 무농약 유러피안 샐러드 꾸러미",
    recommendationPrice: "21,560",
    bananaIdx: 2.38,
  },
  {
    id: 3,
    img: peanut,
    recommendationName: "맛을 그리다 볶음 땅콩 알땅콩 1kg 23년 햇땅콩",
    recommendationPrice: "9,600",
    bananaIdx: 3.6,
  },
  {
    id: 4,
    img: oats,
    recommendationName: "바른곡물 국산 유기농 귀리쌀",
    recommendationPrice: "37,900",
    bananaIdx: 1.78,
  },
  {
    id: 5,
    img: tomato,
    recommendationName: "대추방울토마토",
    recommendationPrice: "20,020",
    bananaIdx: 2.59,
  },
  {
    id: 6,
    img: salad,
    recommendationName: "팜에이트 무농약 유러피안 샐러드 꾸러미",
    recommendationPrice: "21,560",
    bananaIdx: 2.38,
  },
  {
    id: 7,
    img: peanut,
    recommendationName: "맛을 그리다 볶음 땅콩 알땅콩 1kg 23년 햇땅콩",
    recommendationPrice: "9,600",
    bananaIdx: 3.6,
  },
  {
    id: 8,
    img: oats,
    recommendationName: "바른곡물 국산 유기농 귀리쌀",
    recommendationPrice: "37,900",
    bananaIdx: 1.78,
  },
  {
    id: 9,
    img: tomato,
    recommendationName: "대추방울토마토",
    recommendationPrice: "20,020",
    bananaIdx: 2.59,
  },
  {
    id: 10,
    img: salad,
    recommendationName: "팜에이트 무농약 유러피안 샐러드 꾸러미",
    recommendationPrice: "21,560",
    bananaIdx: 2.38,
  },
  {
    id: 11,
    img: peanut,
    recommendationName: "맛을 그리다 볶음 땅콩 알땅콩 1kg 23년 햇땅콩",
    recommendationPrice: "9,600",
    bananaIdx: 3.6,
  },
  {
    id: 12,
    img: oats,
    recommendationName: "바른곡물 국산 유기농 귀리쌀",
    recommendationPrice: "37,900",
    bananaIdx: 1.78,
  },
  {
    id: 13,
    img: tomato,
    recommendationName: "대추방울토마토",
    recommendationPrice: "20,020",
    bananaIdx: 2.59,
  },
  {
    id: 14,
    img: salad,
    recommendationName: "팜에이트 무농약 유러피안 샐러드 꾸러미",
    recommendationPrice: "21,560",
    bananaIdx: 2.38,
  },
  {
    id: 15,
    img: peanut,
    recommendationName: "맛을 그리다 볶음 땅콩 알땅콩 1kg 23년 햇땅콩",
    recommendationPrice: "9,600",
    bananaIdx: 3.6,
  },
  {
    id: 16,
    img: oats,
    recommendationName: "바른곡물 국산 유기농 귀리쌀",
    recommendationPrice: "37,900",
    bananaIdx: 1.78,
  },
  {
    id: 17,
    img: tomato,
    recommendationName: "대추방울토마토",
    recommendationPrice: "20,020",
    bananaIdx: 2.59,
  },
  {
    id: 18,
    img: salad,
    recommendationName: "팜에이트 무농약 유러피안 샐러드 꾸러미",
    recommendationPrice: "21,560",
    bananaIdx: 2.38,
  },
  {
    id: 19,
    img: peanut,
    recommendationName: "맛을 그리다 볶음 땅콩 알땅콩 1kg 23년 햇땅콩",
    recommendationPrice: "9,600",
    bananaIdx: 3.6,
  },
  {
    id: 20,
    img: oats,
    recommendationName: "바른곡물 국산 유기농 귀리쌀",
    recommendationPrice: "37,900",
    bananaIdx: 1.78,
  },
  {
    id: 21,
    img: tomato,
    recommendationName: "대추방울토마토",
    recommendationPrice: "20,020",
    bananaIdx: 2.59,
  },
  {
    id: 22,
    img: salad,
    recommendationName: "팜에이트 무농약 유러피안 샐러드 꾸러미",
    recommendationPrice: "21,560",
    bananaIdx: 2.38,
  },
  {
    id: 23,
    img: peanut,
    recommendationName: "맛을 그리다 볶음 땅콩 알땅콩 1kg 23년 햇땅콩",
    recommendationPrice: "9,600",
    bananaIdx: 3.6,
  },
  {
    id: 24,
    img: oats,
    recommendationName: "바른곡물 국산 유기농 귀리쌀",
    recommendationPrice: "37,900",
    bananaIdx: 1.78,
  },
];

const Products = () => {
  // const [products, setProducts] = useState([]);
  //api통신 useApi훅
  // const { trigger, result, reqIdentifier, loading, error } = useApi({
  //   method: "get",
  //   path: "/items",
  //   data: {},
  //   shouldInitFetch: false,
  // });

  //리덕스로 관리하는 유저 로그인 상태
  // const userIsLoggedIn = useSelector((state) => state.user.isLoggedIn);

  //GET요청 /products
  // useEffect(() => {
  //   if (userIsLoggedIn) {
  //     trigger({
  //       method: "get",
  //       path: "/items",
  //       data: {},
  //       applyResult: true,
  //       isShowBoundary: true,
  //       shouldSetError: true,
  //     });
  //   }
  // }, [userIsLoggedIn]);

  //가져온 products마다 product 카드 보여줌
  //product는 상세페이지

  return (
    <div className="products__wrapper">
      <Categories showAllBtn="false" />
      <ul className="products">
        {products.map((product, idx) => (
          <Link to={`/product/${product.id}`}>
            <li key={`product-${idx}`}>
              <ProductCard
                src={product.img}
                name={product.recommendationName}
                price={product.recommendationPrice}
                bananaImg={banana}
                bananaIdx={product.bananaIdx}
              />
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Products;
