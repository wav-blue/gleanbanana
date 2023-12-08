import tomato from "../../../assets/tomato.png";
import salad from "../../../assets/salad.png";
import peanut from "../../../assets/peanut.png";
import oats from "../../../assets/oats.png";
import banana from "../../../assets/banana.png";
import ProductCard from "../products/ProductCard";

const recommendations = [
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
];

const Recommendations = () => {
  return (
    <div className="recommendation__wrapper">
      <div className="recommendation__head">
        <div>추천상품</div>
      </div>
      <div className="recommendation__card__wrapper">
        <div className="recommendation">
          {recommendations.map((recom, idx) => (
            <ProductCard
              key={`productCard-${idx}`}
              src={recom.img}
              itemName={recom.itemName}
              itemPrice={recom.itemPrice}
              bananaImg={banana}
              bananaIdx={recom.bananaIdx}
              id={recom.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
