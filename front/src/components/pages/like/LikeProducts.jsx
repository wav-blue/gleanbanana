import LikeProduct from "./LikeProduct";
import tomato from "../../../assets/tomato.png";
import salad from "../../../assets/salad.png";
import peanut from "../../../assets/peanut.png";
import oats from "../../../assets/oats.png";
import banana from "../../../assets/banana.png";
import useApi from "../../../hooks/useApi";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

const LikeProducts = () => {
  const [likes, setLikes] = useState([]);
  const param = useParams();
  // id 가져오기

  const { trigger, result, reqIdentifier, loading, error } = useApi({
    method: "get",
    path: `/${param.userId}/wishlist`,
    data: {},
    shouldInitFetch: false,
  });

  useEffect(() => {
    // trigger({
    //   method: "get",
    //   path: "/items",
    //   data: null,
    //   applyResult: true,
    //   isShowBoundary: true,
    //   shouldSetError: false,
    // });
    axios.get(`api/${param.userId}/wishlist`).then((data) => {
      console.log(data);
      return setLikes(data.data);
    });
  }, []);

  return (
    <div className="like__wrapper">
      <div className="like__head">
        <div>찜 목록 ()</div>
      </div>
      <hr />
      <div className="like__wrapper">
        <div className="like">
          {likes &&
            likes?.map((like, idx) => (
              <LikeProduct
                key={`like-${idx}`}
                src={like.img}
                name={like.likeName}
                price={like.likePrice}
                bananaImg={banana}
                bananaIdx={like.bananaIdx}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default LikeProducts;
