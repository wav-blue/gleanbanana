import LikeProduct from "./LikeProduct";
import tomato from "../../../assets/tomato.png";
import salad from "../../../assets/salad.png";
import peanut from "../../../assets/peanut.png";
import oats from "../../../assets/oats.png";
import banana from "../../../assets/banana.png";

const LikeProductList = [
  {
    img: tomato,
    recommendationName: "대추방울토마토",
    recommendationPrice: "20020",
    bananaIdx: 2.59,
  },
  {
    img: salad,
    recommendationName: "팜에이트 무농약 유러피안 샐러드 꾸러미",
    recommendationPrice: "21560",
    bananaIdx: 2.38,
  },
  {
    img: peanut,
    recommendationName: "맛을 그리다 볶음 땅콩 알땅콩 1kg 23년 햇땅콩",
    recommendationPrice: "9600",
    bananaIdx: 3.6,
  },
  {
    img: oats,
    recommendationName: "바른곡물 국산 유기농 귀리쌀",
    recommendationPrice: "37900",
    bananaIdx: 1.78,
  },
];

const LikeProducts = () => {
  return (
    <div className="like__wrapper">
      <div className="like__head">
        <div>찜 목록</div>
      </div>
      <hr />
      <div className="like__wrapper">
        <div className="like">
          {LikeProductList.map((like, idx) => (
            <LikeProduct
              key={`like-${idx}`}
              src={like.img}
              name={like.recommendationName}
              price={like.recommendationPrice}
              bananaImg={banana}
              bananaIdx={like.bananaIdx}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LikeProducts;
