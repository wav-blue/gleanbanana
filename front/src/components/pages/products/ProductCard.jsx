import { Link } from "react-router-dom";
import Card from "../../UI/Card";

const ProductCard = ({
  src,
  itemName,
  itemPrice,
  bananaImg,
  bananaIdx,
  id,
}) => {
  return (
    <Link to={`/product/${id}`}>
      <Card>
        <img src={src} alt={itemName} />
        <div className="recommendation__description__wrapper">
          <div className="recommendation__description">
            <div className="recommendation__description-detail">
              <div className="recommendation__name">{itemName}</div>
              <div className="recommendation__price">
                {Number(itemPrice).toLocaleString()}원
              </div>
            </div>
            <div className="recommendation__description-index">
              <img src={bananaImg} alt="bananaIndex" />
              <div className="recommendation__description-bananaIndex">
                X {bananaIdx}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ProductCard;
