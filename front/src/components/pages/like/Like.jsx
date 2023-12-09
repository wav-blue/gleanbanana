import LikeProducts from "./LikeProducts";
import Side from "../../layout/SideLayout";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Like = () => {
  const userId = useSelector((state) => state.user.userId);
  const navigate = useNavigate();
  if (!userId) {
    console.log("userId가 없어서 /home으로 보냄");
    return navigate("/");
  }
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
