import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import ButtonCommon from "../../UI/ButtonCommon";
import List from "../../UI/List";
import { likeActions } from "../../../store/like";
import { cartActions } from "../../../store/cart";

const LikeProduct = ({ like }) => {
  const { src, name, price, bananaImg, bananaIdx } = like;
  const dispatch = useDispatch();
  const removeHandler = async () => {
    dispatch(likeActions.removeFromLike(like));
  };
  const addToCartHandler = async () => {
    dispatch(
      cartActions.addToCart({
        ...like,
        quantity: 1,
      })
    );
  };

  return (
    <List type="row">
      <img src={src} alt={name} />
      <Link className="like__description__wrapper">
        <div className="like__description">
          <div className="like__description__name">{name}</div>
          <div className="like__description__price">
            {Number(price).toLocaleString()}원
          </div>
        </div>
        <div className="like__description-index">
          <img src={bananaImg} alt="bananaIndex" />
          <div>X {bananaIdx}</div>
        </div>
      </Link>
      <div className="like__button__wrapper">
        <ButtonCommon design="midsmall" onClick={addToCartHandler}>
          장바구니 담기
        </ButtonCommon>
        <ButtonCommon design="midsmall" onClick={removeHandler}>
          삭제
        </ButtonCommon>
      </div>
    </List>
  );
};

export default LikeProduct;
