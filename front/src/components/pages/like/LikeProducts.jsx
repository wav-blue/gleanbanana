import LikeProduct from "./LikeProduct";
import tomato from "../../../assets/tomato.png";
import salad from "../../../assets/salad.png";
import peanut from "../../../assets/peanut.png";
import oats from "../../../assets/oats.png";
import banana from "../../../assets/banana.png";

const LikeProductList = [
  {
    img: tomato,
    likeName: "대추방울토마토",
    likePrice: "20020",
    bananaIdx: 2.59,
  },
  {
    img: salad,
    likeName: "팜에이트 무농약 유러피안 샐러드 꾸러미",
    likePrice: "21560",
    bananaIdx: 2.38,
  },
  {
    img: peanut,
    likeName: "맛을 그리다 볶음 땅콩 알땅콩 1kg 23년 햇땅콩",
    likePrice: "9600",
    bananaIdx: 3.6,
  },
  {
    img: oats,
    likeName: "바른곡물 국산 유기농 귀리쌀",
    likePrice: "37900",
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
              name={like.likeName}
              price={like.likePrice}
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
