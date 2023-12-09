import tomato from "../../../assets/tomato.png";
import salad from "../../../assets/salad.png";
import peanut from "../../../assets/peanut.png";
import oats from "../../../assets/oats.png";
import ProductCard from "../products/ProductCard";
import useApi from "../../../hooks/useApi";
import { useEffect, useState } from "react";

// const recommendations = [
//   {
//     item_id: 1,
//     image_url: tomato,
//     item_name: "대추방울토마토",
//     price: "20020",
//     banana_index: 2.59,
//   },
//   {
//     item_id: 2,
//     image_url: salad,
//     item_name: "팜에이트 무농약 유러피안 샐러드 꾸러미",
//     price: "21560",
//     banana_index: 2.38,
//   },
//   {
//     item_id: 3,
//     image_url: peanut,
//     item_name: "맛을 그리다 볶음 땅콩 알땅콩 1kg 23년 햇땅콩",
//     price: "9600",
//     banana_index: 3.6,
//   },
//   {
//     item_id: 4,
//     image_url: oats,
//     item_name: "바른곡물 국산 유기농 귀리쌀",
//     price: "37900",
//     banana_index: 1.78,
//   },
// ];

const Recommendations = ({ recommendations }) => {
  return (
    <div className="recommendation__wrapper">
      <div className="recommendation__head">
        <div>추천상품</div>
      </div>
      <div className="recommendation__card__wrapper">
        <div className="recommendation">
          {recommendations &&
            recommendations?.map((recom, idx) => (
              <ProductCard key={`productCard-${idx}`} product={recom} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
