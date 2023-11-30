import ButtonCommon from "../../UI/ButtonCommon";
import InputCommon from "../../UI/InputCommon";
import banana from "../../../assets/banana.png";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../../store/cart";
import { likeActions, likeStateSelector } from "../../../store/like";
import Likes from "../../icons/Likes";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

//장바구니에 추가하면 바로 장바구니 페이지로 가게 함
const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const {
    image_url: img,
    item_name: itemName,
    banana_index: bananaIdx,
    price,
  } = product;
  const [itemPrice, setItemPrice] = useState(price);
  const [bananaIndexes, setBananaIndexes] = useState(bananaIdx | 0);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const param = useParams();

  //likeState createSelector로 메모이즈?
  const likeState = useSelector(likeStateSelector);
  const isLike = likeState.find((like) => like.id);
  const onChangeNumHandler = (newValue) => {
    setQuantity(newValue);
    setItemPrice(quantity * price);
  };
  const navigate = useNavigate();

  useEffect(() => {
    setItemPrice(price);
  }, [price]);

  useEffect(() => {
    axios.get(`/api/items/${param.id}`).then((data) => {
      return setProduct(data.data[0]);
    });
  }, [param.id]);

  //찜목록에 추가
  //찜목록에 이미 있다면 해당 버튼을 채워지게 표현
  const addToLikeHandler = () => {
    dispatch(likeActions.addToLike(product));
  };

  //장바구니store에 수량과 함께 추가
  const addToCartHandler = async () => {
    // const { trigger } = useApi({
    //   method: "post",
    //   path: "/cart",
    //   data: {},
    //   shouldInitFetch: false,
    // });
    // const result = await trigger({
    //   method: "post",
    //   path: "/cart",
    //   data: data,
    //   applyResult: true,
    //   isShowBoundary: false,
    //   shouldSetError: false,
    // });
    dispatch(
      cartActions.addToCart({
        ...product,
        quantity: quantity,
      })
    );
    navigate("/cart");
  };

  useEffect(() => {
    // setPrice(itemPrice * quantity);
    setBananaIndexes(bananaIdx * quantity);
  }, [price, bananaIdx, quantity]);

  return (
    <article className="product__article1">
      <img src={img} alt={itemName} />
      <section className="product__section">
        <h1>{itemName}</h1>
        <div className="product__bananaIndex">
          x{(bananaIndexes / 10).toFixed(2)}
        </div>
        <img src={banana} alt="bananaIndex" />
        <section className="product__section2">
          <div className="product__section2--input">
            <InputCommon
              type="number"
              className="gray-square"
              onValueChange={onChangeNumHandler}
            />
            <div className="product__section2--total">총 상품 금액</div>
          </div>
          <div className="product__section2--val">
            {Number(itemPrice).toLocaleString()}원
          </div>
        </section>
        <section className="product__section3--button">
          <ButtonCommon design="small" onClick={addToLikeHandler}>
            {!isLike && (
              <span className="material-symbols-outlined">favorite</span>
            )}
            {isLike && <Likes />}
          </ButtonCommon>
          <ButtonCommon design="medium" onClick={addToCartHandler}>
            장바구니 담기
          </ButtonCommon>
          <ButtonCommon design="medium">바로 구매하기</ButtonCommon>
        </section>
      </section>
    </article>
  );
};

export default ProductDetail;