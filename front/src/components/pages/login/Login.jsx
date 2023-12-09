import LoginForm from "./LoginForm";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.userId);

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
    </div>
  );
};

export default Login;
