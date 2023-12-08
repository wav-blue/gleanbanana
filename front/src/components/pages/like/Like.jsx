import LikeProducts from "./LikeProducts";
import Side from "../../layout/SideLayout";

const Like = () => {
  return (
    <div className="mypage">
      <div className="mypage__sidebar">
        <Side />
      </div>
      <div className="mypage__content">
        <LikeProducts />
      </div>
    </div>
  );
};

export default Like;
