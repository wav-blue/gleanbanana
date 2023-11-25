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
    itemName: "대추방울토마토",
    itemPrice: "20020",
    bananaIdx: 2.59,
    deliveryDate: "2023-11-25",
    deliveryFee: 0,
  },
  {
    id: 2,
    img: salad,
    itemName: "팜에이트 무농약 유러피안 샐러드 꾸러미",
    itemPrice: "21560",
    bananaIdx: 2.38,
    deliveryDate: "2023-11-25",
    deliveryFee: 0,
  },
  {
    id: 3,
    img: peanut,
    itemName: "맛을 그리다 볶음 땅콩 알땅콩 1kg 23년 햇땅콩",
    itemPrice: "9600",
    bananaIdx: 3.6,
    deliveryDate: "2023-11-25",
    deliveryFee: 0,
  },
  {
    id: 4,
    img: oats,
    itemName: "바른곡물 국산 유기농 귀리쌀",
    itemPrice: "37900",
    bananaIdx: 1.78,
    deliveryDate: "2023-11-25",
    deliveryFee: 0,
  },
  {
    id: 5,
    img: tomato,
    itemName: "대추방울토마토",
    itemPrice: "20020",
    bananaIdx: 2.59,
    deliveryDate: "2023-11-25",
    deliveryFee: 0,
  },
  {
    id: 6,
    img: salad,
    itemName: "팜에이트 무농약 유러피안 샐러드 꾸러미",
    itemPrice: "21560",
    bananaIdx: 2.38,
    deliveryDate: "2023-11-25",
    deliveryFee: 0,
  },
  {
    id: 7,
    img: peanut,
    itemName: "맛을 그리다 볶음 땅콩 알땅콩 1kg 23년 햇땅콩",
    itemPrice: "9600",
    bananaIdx: 3.6,
    deliveryDate: "2023-11-25",
    deliveryFee: 0,
  },
  {
    id: 8,
    img: oats,
    itemName: "바른곡물 국산 유기농 귀리쌀",
    itemPrice: "37900",
    bananaIdx: 1.78,
    deliveryDate: "2023-11-25",
    deliveryFee: 0,
  },
  {
    id: 9,
    img: tomato,
    itemName: "대추방울토마토",
    itemPrice: "20020",
    bananaIdx: 2.59,
    deliveryDate: "2023-11-25",
    deliveryFee: 0,
  },
  {
    id: 10,
    img: salad,
    itemName: "팜에이트 무농약 유러피안 샐러드 꾸러미",
    itemPrice: "21560",
    bananaIdx: 2.38,
    deliveryDate: "2023-11-25",
    deliveryFee: 0,
  },
  {
    id: 11,
    img: peanut,
    itemName: "맛을 그리다 볶음 땅콩 알땅콩 1kg 23년 햇땅콩",
    itemPrice: "9600",
    bananaIdx: 3.6,
    deliveryDate: "2023-11-25",
    deliveryFee: 0,
  },
  {
    id: 12,
    img: oats,
    itemName: "바른곡물 국산 유기농 귀리쌀",
    itemPrice: "37900",
    bananaIdx: 1.78,
    deliveryDate: "2023-11-25",
    deliveryFee: 0,
  },
  {
    id: 13,
    img: tomato,
    itemName: "대추방울토마토",
    itemPrice: "20020",
    bananaIdx: 2.59,
    deliveryDate: "2023-11-25",
    deliveryFee: 0,
  },
  {
    id: 14,
    img: salad,
    itemName: "팜에이트 무농약 유러피안 샐러드 꾸러미",
    itemPrice: "21560",
    bananaIdx: 2.38,
    deliveryDate: "2023-11-25",
    deliveryFee: 0,
  },
  {
    id: 15,
    img: peanut,
    itemName: "맛을 그리다 볶음 땅콩 알땅콩 1kg 23년 햇땅콩",
    itemPrice: "9600",
    bananaIdx: 3.6,
    deliveryDate: "2023-11-25",
    deliveryFee: 0,
  },
  {
    id: 16,
    img: oats,
    itemName: "바른곡물 국산 유기농 귀리쌀",
    itemPrice: "37900",
    bananaIdx: 1.78,
    deliveryDate: "2023-11-25",
    deliveryFee: 0,
  },
  {
    id: 17,
    img: tomato,
    itemName: "대추방울토마토",
    itemPrice: "20020",
    bananaIdx: 2.59,
    deliveryDate: "2023-11-25",
    deliveryFee: 0,
  },
  {
    id: 18,
    img: salad,
    itemName: "팜에이트 무농약 유러피안 샐러드 꾸러미",
    itemPrice: "21560",
    bananaIdx: 2.38,
    deliveryDate: "2023-11-25",
    deliveryFee: 0,
  },
  {
    id: 19,
    img: peanut,
    itemName: "맛을 그리다 볶음 땅콩 알땅콩 1kg 23년 햇땅콩",
    itemPrice: "9600",
    bananaIdx: 3.6,
    deliveryDate: "2023-11-25",
    deliveryFee: 0,
  },
  {
    id: 20,
    img: oats,
    itemName: "바른곡물 국산 유기농 귀리쌀",
    itemPrice: "37900",
    bananaIdx: 1.78,
    deliveryDate: "2023-11-25",
    deliveryFee: 0,
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

  //경로가 ?category=dairy일떄 요청?

  return (
    <div className="products__wrapper">
      <Categories showAllBtn="false" />
      <ul className="products">
        {products.map((product, idx) => (
          <li key={`product-${idx}`}>
            <ProductCard
              id={product.id}
              src={product.img}
              itemName={product.itemName}
              itemPrice={product.itemPrice}
              bananaImg={banana}
              bananaIdx={product.bananaIdx}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
