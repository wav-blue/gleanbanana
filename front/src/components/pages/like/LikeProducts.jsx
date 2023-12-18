import LikeProduct from "./LikeProduct";
import useApi from "../../../hooks/useApi";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { likeActions } from "../../../store/like";
import SkeletonProductCard from "../products/SkeletonProductCard";

const LikeProducts = () => {
  const dispatch = useDispatch();
  const likeLists = useSelector((state) => state.like.likeLists);
  // id 가져오기

  const { trigger, result, reqIdentifier, loading, error } = useApi({
    method: "get",
    path: `/wishlist`,
    shouldInitFetch: false,
  });

  useEffect(() => {
    trigger({
      method: "get",
      path: `/wishlist`,
      applyResult: true,
      isShowBoundary: true,
    });
  }, []);

  useEffect(() => {
    console.log("data를 가져와서 dispatch합니다");
    console.log(result?.data);
    dispatch(likeActions.storeToLike(result?.data));
  }, [result.data]);

  return (
    <div className="like__wrapper">
      <div className="like__head">
        <div>찜 목록 ({likeLists ? likeLists.length : 0})</div>
      </div>
      <hr />
      <div className="like__wrapper">
        <div className="like">
          {likeLists &&
            likeLists?.map((like, idx) => (
              <LikeProduct key={`like-${idx}`} like={like} />
            ))}
          {!likeLists && "아직 찜한 상품이 없습니다."}
        </div>
      </div>
    </div>
  );
};

export default LikeProducts;
