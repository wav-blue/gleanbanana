import { Link } from "react-router-dom";
import ButtonCommon from "../../UI/ButtonCommon";
import List from "../../UI/List";
import bananaImg from "../../../assets/banana.png";

const OrderProduct = ({ src, id, status, date, price, bananaIdx }) => {
  return (
    <List type="rowcard">
      <img src={src} alt={id} />
      <Link className="order__description__wrapper">
        <div className="order__description">
          <div className="order__description__delivery">
            <div className="order__description__status">{status}</div>
            <div className="order__description__date">{date}</div>
          </div>
          <div className="order__description__price">
            {Number(price).toLocaleString()}원
          </div>
        </div>
        <div className="order__description-index">
          <img src={bananaImg} alt="bananaIndex" />
          <div>X {bananaIdx}</div>
        </div>
      </Link>
      <div className="order__button__wrapper">
        <ButtonCommon design="bigsmall">배송조회</ButtonCommon>
        <ButtonCommon design="bigsmall">주문 및 배송취소</ButtonCommon>
      </div>
    </List>
  );
};

export default OrderProduct;
