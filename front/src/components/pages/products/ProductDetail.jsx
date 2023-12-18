import ButtonCommon from "../../UI/ButtonCommon";
import banana from "../../../assets/banana.png";
import { useState, useEffect, useCallback, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import Likes from "../../icons/Likes";
import LikesFilled from "../../icons/LikesFilled";
import { useNavigate, useParams } from "react-router-dom";
import useApi from "../../../hooks/useApi";
import { purchaseActions } from "../../../store/purchase";
import InputNumber from "../../UI/InputNumber";
import { likeActions } from "../../../store/like";
import useConfirm from "../../../hooks/useConfirm";

//장바구니에 추가하면 바로 장바구니 페이지로 가게 함
const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [bananaIndexes, setBananaIndexes] = useState(product.banana_index);
  const [itemPrice, setItemPrice] = useState(product.price);
  const userId = useSelector((state) => state.user.userId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const param = useParams();
  const { trigger, result, reqIdentifier } = useApi({
    method: "post",
    path: "/cart",
    data: {},
    shouldInitFetch: false,
  });

  const likeState = useSelector((state) => state.like.likeLists);
  const [wasLike, setWasLike] = useState(null);
  const [isLike, setIsLike] = useState(!!wasLike);

  //=============GET===============

  const getProductDetail = () => {
    trigger({
      method: "get",
      path: `/items/${param.id}`,
      applyResult: true,
      isShowBoundary: true,
    });
  };

  //ProductDetail GET
  useEffect(() => {
    getProductDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param.id]);

  //=============POST==============

  //Cart POST
  const addToCartHandler = useCallback(async () => {
    const addCartData = {
      ...product,
      item_id: product.item_id,
      price: itemPrice,
      banana_index: bananaIndexes,
      quantity: quantity,
    };
    //비로그인 유저
    if (!userId) {
      const existedCart = localStorage.getItem("cartItems");
      const cart = existedCart ? [...JSON.parse(existedCart)] : [];
      cart.push(addCartData);
      localStorage.setItem("cartItems", JSON.stringify(cart));
      return navigate("/cart");
    }

    //로그인 된 유저
    userId &&
      (await trigger({
        method: "post",
        path: `/${userId}/carts`,
        data: addCartData,
        applyResult: true,
        isShowBoundary: true,
      }));
    // ===========================================thunk 구현필==============================
    navigate("/cart");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product, quantity, itemPrice]);

  //POST like
  const addToLikeHandler = useCallback(async () => {
    if (!userId) return alert("로그인 후 이용해주세요!");
    if (!isLike) {
      await trigger({
        method: "post",
        path: `/${userId}/wishlist`,
        data: product,
        applyResult: true,
        isShowBoundary: true,
      });
      alert("찜 목록에 추가되었습니다.");
      setIsLike(true);
    } else {
      trigger({
        method: "delete",
        path: `/${userId}/wishlist/${product.item_id}`,
        applyResult: true,
        isShowBoundary: true,
      });
      alert("찜 해제되었습니다.");
      setIsLike(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product, isLike]);

  //==========상태변경================
  //찜목록 상태 변경
  useEffect(() => {
    const foundLike = likeState?.find(
      (like) => like.item_id === product.item_id
    );
    setWasLike(foundLike);
  }, [likeState, product.item_id]);

  //찜목록 변경
  useEffect(() => {
    setIsLike(!!wasLike);
  }, [wasLike]);

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
    //이부분이 필요있을까?
    if (reqIdentifier === "getData") {
      setProduct(result?.data[0]);
    }
    if (reqIdentifier === "postData" && isLike) {
      dispatch(likeActions.addToLike(product));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data]);

  const toLogin = () => {
    navigate("/login");
  };
  const toHome = () => {
    return;
  };
  const onConfirm = useConfirm(
    "로그인된 유저만 사용가능합니다!",
    toLogin,
    toHome
  );
  const onClickPurchase = async () => {
    console.log({ ...product, quantity });
    if (!userId) {
      return onConfirm();
    }
    dispatch(purchaseActions.storeToPurchase([{ ...product, quantity }]));
    // ===========================================thunk 구현필==================================
    navigate(`/purchase`);
  };

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
            <InputNumber onValueChange={onChangeNumHandler} value={quantity} />
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
            <ButtonCommon design="medium" onClick={onClickPurchase}>
              바로 구매하기
            </ButtonCommon>
          </section>
        </section>
      </article>
    </Suspense>
  );
};

export default ProductDetail;
