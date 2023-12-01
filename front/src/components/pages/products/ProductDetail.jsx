import ButtonCommon from "../../UI/ButtonCommon";
import InputCommon from "../../UI/InputCommon";
import banana from "../../../assets/banana.png";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likeActions } from "../../../store/like";
import Likes from "../../icons/Likes";
import { useNavigate, useParams } from "react-router-dom";
import useApi from "../../../hooks/useApi";

//장바구니에 추가하면 바로 장바구니 페이지로 가게 함
const ProductDetail = () => {
  const [product, setProduct] = useState({
    image_url: "",
    item_name: "",
    banana_index: 0,
    price: 0,
  });
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
  const { trigger, result, reqIdentifier, loading } = useApi({
    method: "post",
    path: "/cart",
    data: {},
    shouldInitFetch: false,
  });
  const likeState = useSelector((state) => state.likeLists);
  const isLike =
    likeState && likeState.find((like) => like.item_id === product.item_id);
  const navigate = useNavigate();

  //ProductDetail GET
  useEffect(() => {
    //detail정보 가져오기
    const getProductDetail = async () => {
      await trigger({
        method: "get",
        path: `/items/${param.id}`,
        data: undefined,
        applyResult: true,
        isShowBoundary: false,
      });
    };
    getProductDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param.id]);

  //Cart POST
  const addToCartHandler = useCallback(async () => {
    const addCartData = {
      ...product,
      quantity: quantity,
    };
    await trigger({
      method: "post",
      path: "/cart",
      data: addCartData,
      applyResult: true,
      isShowBoundary: false,
    });
    navigate("/cart");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product, quantity]);

  //POST like
  const addToLikeHandler = useCallback(() => {
    dispatch(likeActions.addToLike(product));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  //quantity변경
  const onChangeNumHandler = (newValue) => {
    setQuantity(newValue);
  };

  //quantity 변경 -> itemPrice변경
  useEffect(() => {
    setItemPrice(quantity * price);
    setBananaIndexes(bananaIdx * quantity);
  }, [price, quantity, bananaIdx]);

  //trigger의 결과로 result가 변경이 되면
  //setProduct (dispatch는 cart로 바로 옮겨지고 get요청 할거기때문에 안해!)
  //근데 옮겨지고 나서 product를 변경하면 어떻게해?!
  //신나는 메모리릭하하하
  useEffect(() => {
    console.log(result?.data?.data);
    setProduct(result?.data?.data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data]);

  return (
    <article className="product__article1">
      <img src={img} alt={itemName} />
      <section className="product__section">
        <h1>{itemName}</h1>
        <div className="product__bananaIndex">
          x{(bananaIndexes / 100).toFixed(2)}
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
