import List from "../../UI/List";

const LikeProduct = ({ src, name, price, bananaImg, bananaIdx }) => {
  return (
    <List>
      <img src={src} alt={name} />
      <div className="like__description__wrapper">
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
      </div>
      <div className="like__button__wrapper">
        <button className="like__add">장바구니 담기</button>
        <button className="like__delete">삭제</button>
      </div>
    </List>
  );
};

export default LikeProduct;
