import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ButtonCommon from "../UI/ButtonCommon";
import { userLoginActions } from "../../store/userLogin";
import useApi from "../../hooks/useApi";
import { useEffect } from "react";

const NavBar = () => {
  const loggedInUserId = useSelector((state) => state.user.userId);
  const dispatch = useDispatch();
  const { trigger, result, reqIdentifier, loading, error } = useApi({
    method: "post",
    path: `/users/logout`,
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
    // trigger({});
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
        <ButtonCommon onClick={onClickLogout}>로그아웃</ButtonCommon>
      )}
    </div>
  );
};

export default NavBar;
