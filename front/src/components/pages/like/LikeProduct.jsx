import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ButtonCommon from "../../UI/ButtonCommon";
import banana from "../../../assets/banana.png";
import List from "../../UI/List";
import { likeActions } from "../../../store/like";
import useApi from "../../../hooks/useApi";
import { useCallback, useEffect, useState } from "react";
import useConfirm from "../../../hooks/useConfirm";

const LikeProduct = ({ like }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.user.userId);
  const [isDeleted, setIsDeleted] = useState(false);

  const { trigger, result, reqIdentifier, loading, error } = useApi({
    method: "delete",
    path: `/wishlist/${like.item_id}`,
    data: {},
    shouldInitFetch: false,
  });

  const removeHandler = useCallback(() => {
    if (!userId) return;
    trigger({
      method: "delete",
      path: `/wishlist/${like.item_id}`,
      applyResult: true,
      isShowBoundary: true,
    });
    setIsDeleted((prev) => !prev);
  }, [userId, like.item_id]);

  useEffect(() => {
    if (!reqIdentifier) return;
    if (reqIdentifier === "deleteData") {
      console.log("delete성공하여 removeFromLike");
      dispatch(likeActions.removeFromLike(like));
    }
    if (reqIdentifier === "postData") {
      console.log("delete성공하여 addToCart");
    }
  }, [isDeleted]);

  const toLogin = () => {
    navigate("/login");
  };
  const toHome = () => {
    navigate("/home");
  };
  const onConfirm = useConfirm(
    "로그인된 유저만 사용가능합니다!",
    toLogin,
    toHome
  );

  const addToCartHandler = useCallback(async () => {
    if (!userId) return onConfirm();
    await trigger({
      method: "post",
      path: `/${userId}/carts`,
      data: {
        ...like,
        itemId: like.item_id,
        quantity: 1,
      },
      applyResult: true,
      isShowBoundary: true,
    });
    await trigger({
      method: "delete",
      path: `/wishlist/${like.item_id}`,
      applyResult: true,
      isShowBoundary: true,
    });
    navigate("/cart");
  }, [userId]);

  return (
    <List type="row">
      <img src={like.image_url} alt={like.item_name} />
      <Link className="like__description__wrapper">
        <div className="like__description">
          <div className="like__description__name">{like.item_name}</div>
          <div className="like__description__price">
            {Number(like.price).toLocaleString()}원
          </div>
        </div>
        <div className="like__description-index">
          <img src={banana} alt="bananaIndex" />
          <div>X {(like.banana_index / 100).toFixed(2)}</div>
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
