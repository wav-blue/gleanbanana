import LoginForm from "./LoginForm";

const Login = () => {
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
