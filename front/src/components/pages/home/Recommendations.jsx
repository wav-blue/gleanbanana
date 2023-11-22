import tomato from "../../../assets/tomato.png";
import salad from "../../../assets/salad.png";
import peanut from "../../../assets/peanut.png";
import oats from "../../../assets/oats.png";
import banana from "../../../assets/banana.png";
import ProductCard from "../products/ProductCard";

const recommendations = [
  {
    img: tomato,
    recommendationName: "대추방울토마토",
    recommendationPrice: "20,020",
    bananaIdx: 2.59,
  },
  {
    img: salad,
    recommendationName: "팜에이트 무농약 유러피안 샐러드 꾸러미",
    recommendationPrice: "21,560",
    bananaIdx: 2.38,
  },
  {
    img: peanut,
    recommendationName: "맛을 그리다 볶음 땅콩 알땅콩 1kg 23년 햇땅콩",
    recommendationPrice: "9,600",
    bananaIdx: 3.6,
  },
  {
    img: oats,
    recommendationName: "바른곡물 국산 유기농 귀리쌀",
    recommendationPrice: "37,900",
    bananaIdx: 1.78,
  },
];

const Recommendations = () => {
  return (
    <div className="recommendation__wrapper">
      <div className="recommendation__head">
        <div>추천상품</div>
      </div>
      <div className="recommendation__wrapper">
        <div className="recommendation">
          {recommendations.map((recom, idx) => (
            <ProductCard
              key={`productCard-${idx}`}
              src={recom.img}
              name={recom.recommendationName}
              price={recom.recommendationPrice}
              bananaImg={banana}
              bananaIdx={recom.bananaIdx}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
