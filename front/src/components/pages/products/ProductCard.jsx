import { Link } from "react-router-dom";
import Card from "../../UI/Card";
import banana from "../../../assets/banana.png";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.item_id}`}>
      <Card>
        <div className="card__img">
          <img src={product.image_url} alt={product.item_name} />
        </div>
        <div className="recommendation__description__wrapper">
          <div className="recommendation__description">
            <div className="recommendation__description-detail">
              <div className="recommendation__name">{product.item_name}</div>
              <div className="recommendation__price">
                {Number(product.price).toLocaleString()}원
              </div>
            </div>
            <div className="recommendation__description-index">
              <img src={banana} alt="bananaIndex" />
              <div className="recommendation__description-bananaIndex">
                X x{(product.banana_index / 100).toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ProductCard;
