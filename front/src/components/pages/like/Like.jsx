import LikeProducts from "./LikeProducts";
import Side from "../../layout/SideLayout";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Like = () => {
  const userId = useSelector((state) => state.userLogin.userId);
  const navigate = useNavigate();
  if (!userId) {
    navigate("/");
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
