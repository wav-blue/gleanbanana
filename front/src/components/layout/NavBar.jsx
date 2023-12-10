import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ButtonCommon from "../UI/ButtonCommon";
import { userLoginActions } from "../../store/userLogin";
import useApi from "../../hooks/useApi";
import { useEffect } from "react";
import { cartActions } from "../../store/cart";
import { orderActions } from "../../store/order";
import { purchaseActions } from "../../store/purchase";
import { likeActions } from "../../store/like";

const NavBar = () => {
  const loggedInUserId = useSelector((state) => state.user.userInfo?.user_id);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { trigger } = useApi({
    method: "get",
    path: `/${loggedInUserId}/logout`,
    data: {},
    shouldInitFetch: false,
  });

  // user: userLoginReducer,
  // cart: cartReducer,
  // like: likeReducer,
  // purchase: purchaseReducer,
  // order: orderReducer,

  const removeLoginData = async () => {
    loggedInUserId && (await trigger({}));
    localStorage.removeItem("refreshToken");
    navigate("/");
  };

  useEffect(() => {
    console.log(user);
    if (!loggedInUserId) {
      removeLoginData();
    }
  }, [user]);

  //purchase //ordered //like //purchaseTotal //cartTotal //cartCheckedList
  const onClickLogout = async () => {
    console.log("logout ====================");
    dispatch(userLoginActions.logoutUser());
    dispatch(cartActions.removeAllFromCheckedList());
    dispatch(orderActions.initializeOrdered());
    dispatch(purchaseActions.initializePurchaseList());
    dispatch(cartActions.initializeCart());
    dispatch(likeActions.initializeLikeState());
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
