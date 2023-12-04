import ButtonCommon from "../../UI/ButtonCommon";
import InputCommon from "../../UI/InputCommon";
import banana from "../../../assets/banana.png";
import { useState, useEffect, useCallback, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likeActions } from "../../../store/like";
import Likes from "../../icons/Likes";
import LikesFilled from "../../icons/LikesFilled";
import { useNavigate, useParams } from "react-router-dom";
import useApi from "../../../hooks/useApi";

//장바구니에 추가하면 바로 장바구니 페이지로 가게 함
const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [bananaIndexes, setBananaIndexes] = useState(product.banana_index);
  const [itemPrice, setItemPrice] = useState(product.price);

  const dispatch = useDispatch();
  const param = useParams();
  const { trigger, result, reqIdentifier } = useApi({
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
        applyResult: true,
        isShowBoundary: true,
      });
    };

    getProductDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param.id]);

  //Cart POST
  const addToCartHandler = useCallback(async () => {
    const addCartData = {
      ...product,
      itemId: product.item_id,
      price: itemPrice,
      banana_index: bananaIndexes,
      quantity: quantity,
    };
    console.log(addCartData);
    await trigger({
      method: "post",
      path: "/01HGB9HKEM19XHHB180VF2N8XT/carts",
      data: addCartData,
      applyResult: true,
      isShowBoundary: true,
    });
    navigate("/cart");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product, quantity]);

  //POST like
  const addToLikeHandler = useCallback(async () => {
    console.log(product);
    // await trigger({
    //   method: "post",
    //   path: "/01HGB9HKEM19XHHB180VF2N8XT/wishlist",
    //   data: product,
    //   applyResult: true,
    //   isShowBoundary: true,
    // });
    await dispatch(likeActions.addToLike(product));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  //quantity변경
  const onChangeNumHandler = (newValue) => {
    setQuantity(newValue);
  };

  //quantity변경시 bananaIndex, itemPrice변경
  useEffect(() => {
    setBananaIndexes(product.banana_index * quantity);
    setItemPrice(product.price * quantity);
  }, [quantity, product]);

  //trigger의 결과로 result가 변경이 되면
  useEffect(() => {
    if (reqIdentifier === "getData") {
      setProduct(result?.data[0]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <article className="product__article1">
        <img src={product.image_url} alt={product.item_name} />
        <section className="product__section">
          <section className="product__section1">
            <h1>{product.item_name}</h1>
            <div className="product__bananaIndex">
              x{(bananaIndexes / 100).toFixed(2)}
            </div>
            <img src={banana} alt="bananaIndex" />
          </section>
          <section className="product__section2">
            <InputCommon
              type="number"
              className="gray-square"
              onValueChange={onChangeNumHandler}
            />
            <div className="product__section2--totalVal">
              <div className="product__section2--total">총 상품 금액</div>
              <div className="product__section2--val">
                {Number(itemPrice).toLocaleString()}원
              </div>
            </div>
          </section>
          <section className="product__section3--button">
            <ButtonCommon design="small" onClick={addToLikeHandler}>
              {!isLike ? <Likes /> : <LikesFilled />}
            </ButtonCommon>
            <ButtonCommon design="medium" onClick={addToCartHandler}>
              장바구니 담기
            </ButtonCommon>
            <ButtonCommon design="medium">바로 구매하기</ButtonCommon>
          </section>
        </section>
      </article>
    </Suspense>
  );
};

export default ProductDetail;
