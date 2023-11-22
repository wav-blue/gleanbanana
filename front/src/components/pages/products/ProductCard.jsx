import Card from "../../UI/Card";

const ProductCard = ({ src, name, price, bananaImg, bananaIdx }) => {
  return (
    <Card>
      <img src={src} alt={name} />
      <div className="recommendation__description__wrapper">
        <div className="recommendation__description">
          <div className="recommendation__description-detail">
            <div className="recommendation__name">{name}</div>
            <div className="recommendation__price">{price}원</div>
          </div>
          <div className="recommendation__description-index">
            <img src={bananaImg} alt="bananaIndex" />
            <div>X {bananaIdx}</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
