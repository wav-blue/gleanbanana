import { userLoginActions } from "../../../store/userLogin";
import ButtonCommon from "../../UI/ButtonCommon";
import LoginForm from "./LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.userInfo);

  const onClickTest = () => {
    dispatch(userLoginActions.loginUser("01HGB9HKEM19XHHB180VF2N8XT"));
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/home");
    }
  }, [userInfo, navigate]);

  return (
    <div className="login__wrapper">
      <div className="login">
        <div className="login__head">로그인</div>
        <hr />
        <LoginForm />
      </div>
      <ButtonCommon onClick={onClickTest}>테스트용 로그인!</ButtonCommon>
    </div>
  );
};

export default Login;
