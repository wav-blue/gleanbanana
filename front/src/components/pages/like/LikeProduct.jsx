import { Link } from "react-router-dom";
import ButtonCommon from "../../UI/ButtonCommon";
import List from "../../UI/List";

const LikeProduct = ({ src, name, price, bananaImg, bananaIdx }) => {
  return (
    <List>
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
        <ButtonCommon design="midsmall">장바구니 담기</ButtonCommon>
        <ButtonCommon design="midsmall">삭제</ButtonCommon>
      </div>
    </List>
  );
};

export default LikeProduct;
