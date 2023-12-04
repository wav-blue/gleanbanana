import LikeProduct from "./LikeProduct";
import useApi from "../../../hooks/useApi";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { likeActions } from "../../../store/like";

const LikeProducts = () => {
  const dispatch = useDispatch();
  const likeLists = useSelector((state) => state.like.likeLists);
  // id 가져오기

  const { trigger, result, reqIdentifier, loading, error } = useApi({
    method: "get",
    path: `/01HGB9HKEM19XHHB180VF2N8XT/wishlist`,
    data: {},
    shouldInitFetch: false,
  });

  useEffect(() => {
    trigger({
      method: "get",
      path: `/01HGB9HKEM19XHHB180VF2N8XT/wishlist`,
      data: {},
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
        <div>찜 목록 ()</div>
      </div>
      <hr />
      <div className="like__wrapper">
        <div className="like">
          {likeLists}
          {/* {likeLists &&
            likeLists?.map((like, idx) => (
              <LikeProduct key={`like-${idx}`} like={like} />
            ))} */}
        </div>
      </div>
    </div>
  );
};

export default LikeProducts;
