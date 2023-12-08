import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ButtonCommon from "../UI/ButtonCommon";
import { userLoginActions } from "../../store/userLogin";
import useApi from "../../hooks/useApi";
import { useEffect } from "react";

const NavBar = () => {
  const loggedInUserId = useSelector((state) => state.user.userId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { trigger } = useApi({
    method: "get",
    path: `/${loggedInUserId}/logout`,
    data: {},
    shouldInitFetch: false,
  });

  useEffect(() => {
    console.log(loggedInUserId);
    console.log(!loggedInUserId);
  }, [loggedInUserId]);

  //    path: `/${loggedInUserId}/logout`로 변경 예정!!!
  const onClickLogout = () => {
    dispatch(userLoginActions.logoutUser());
    localStorage.removeItem("refreshToken");
    trigger({});
    navigate("/");
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
