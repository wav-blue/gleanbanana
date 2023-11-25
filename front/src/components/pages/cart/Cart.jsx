import banana from "../../../assets/banana.png";
import InputCommon from "../../UI/InputCommon";
const Cart = ({ cart }) => {
  return (
    <article className="cart__wrapper">
      <div className="cart">
        <div className="cart__check">
          <InputCommon type="checkbox" onChange={() => {}} />
          <img src={cart.img} alt={cart.itemName} />
        </div>
        <div className="cart__description__wrapper">
          <div className="cart__description">
            <div className="cart__description-name">{cart.itemName}</div>
            <div className="cart__description-delivery">
              {cart.deliveryDate}에 도착예정
            </div>
          </div>
          <div className="cart__description__val">
            {Number(cart.itemPrice).toLocaleString()}원
          </div>
        </div>
        <div className="cart__bananaIndex">
          <img src={banana} alt="bananaIndex" />
          <div className="cart__bananaIndexNum">x{cart.bananaIdx}</div>
        </div>
      </div>
    </article>
  );
};

export default Cart;
