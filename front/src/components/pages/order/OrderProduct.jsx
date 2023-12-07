import { Link } from "react-router-dom";
import ButtonCommon from "../../UI/ButtonCommon";
import List from "../../UI/List";
import bananaImg from "../../../assets/banana.png";

const OrderProduct = ({ order }) => {
  return (
    <List type="rowcard">
      <img src={order.image_url} alt={order.item_id} />
      <Link className="order__description__wrapper">
        <div className="order__description">
          <div className="order__description__delivery">
            <div className="order__description__status">
              {order.item_name} 외 {order.item_array_length}
            </div>
            <div className="order__description__date">
              {order.expected_delivery}예정
            </div>
          </div>
          <div className="order__description__price">
            {Number(order.total_price).toLocaleString()}원
          </div>
        </div>
        <div className="order__description-index">
          <img src={bananaImg} alt="bananaIndex" />
          <div>X {order.total_banana_index}</div>
        </div>
      </Link>
      <div className="order__button__wrapper">
        <ButtonCommon design="bigsmall" link={`/order/${order.order_id}`}>
          주문내역 조회
        </ButtonCommon>
        <ButtonCommon design="bigsmall">주문 및 배송취소</ButtonCommon>
      </div>
    </List>
  );
};

export default OrderProduct;
