import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ButtonCommon from "../UI/ButtonCommon";
import { userLoginActions } from "../../store/userLogin";
import useApi from "../../hooks/useApi";
import { useEffect, useState } from "react";
import { cartActions } from "../../store/cart";
import { orderActions } from "../../store/order";
import { purchaseActions } from "../../store/purchase";
import { likeActions } from "../../store/like";

const NavBar = () => {
  const loggedInUserId = useSelector((state) => state.user.userInfo?.user_id);
  const [isClickedLogout, setIsClickedLogout] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { trigger } = useApi({
    method: "get",
    path: `/${loggedInUserId}/logout`,
    data: {},
    shouldInitFetch: false,
  });

  //logout 버튼 클릭 안되는 문제 !
  //logout

  // // 비로그인유저가 로그인이나 회원가입 버튼을 클릭시 홈화면으로 다시 가게 되는 원인.....
  // useEffect(() => {
  //   console.log({ isClickedLogout, user });
  //   if (isClickedLogout && !user) {
  //     console.log("home으로 갑시다");
  //     navigate("/");
  //   }
  // }, [isClickedLogout, user, navigate]);

  const onClickLogout = async () => {
    console.log("logout ====================");
    setIsClickedLogout(true);
    dispatch(userLoginActions.logoutUser());
    dispatch(cartActions.removeAllFromCheckedList());
    dispatch(orderActions.initializeOrdered());
    dispatch(purchaseActions.initializePurchaseList());
    dispatch(cartActions.initializeCart());
    dispatch(likeActions.initializeLikeState());
    await trigger({});
    localStorage.removeItem("refreshToken");
    setIsClickedLogout(true);
  };
  return (
    <div className="navBar">
      {!loggedInUserId && (
        <>
          <Link to="/login">로그인</Link>
          <Link to="/join">회원가입</Link>
        </>
      )}
      {loggedInUserId && (
        <ButtonCommon onClick={onClickLogout} design="logout">
          로그아웃
        </ButtonCommon>
      )}
    </div>
  );
};

export default NavBar;
