import { useMemo, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ButtonCommon from "../../UI/ButtonCommon";
import InputCommon from "../../UI/InputCommon";
import { validateEmail, validatePassword } from "../../../utils/validate";
import useApi from "../../../hooks/useApi";
import { useDispatch, useSelector } from "react-redux";
import { userLoginActions } from "../../../store/userLogin";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFocusEmail, setIsFocusEmail] = useState(false);
  const [isFocusPassword, setIsFocusPassword] = useState(false);
  const { trigger, result, reqIdentifier, loading, error } = useApi({
    method: "post",
    path: "/users/login",
    data: {},
    shouldInitFetch: false,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginUserId = useSelector((state) => state.user.userId);

  const isEmailValid = useMemo(() => validateEmail(email), [email]);
  const isPasswordValid = useMemo(() => validatePassword(password), [password]);

  const loginData = { email, password };

  const onClickLogin = (e) => {
    e.preventDefault();
    trigger({
      data: loginData,
      applyResult: true,
      isShowBoundary: true,
    });
  };

  //result.status 성공시 201? 확인
  useEffect(() => {
    if (reqIdentifier === "postData" && result.status === 200) {
      dispatch(userLoginActions.loginUser(result.data.user_id));
      const newAccessToken = result.data.Authorization.split(" ")[1];
      //refreshToken 만료시간에 동일한 localStorage 만료시간
      localStorage.setItem("refreshToken", newAccessToken);
    }
  }, [result.status, reqIdentifier]);

  useEffect(() => {
    if (loginUserId) {
      navigate("/");
    }
  }, [loginUserId]);

  return (
    <form className="login__input">
      <div className="login__input-check">
        <InputCommon
          placeholder="이메일을 입력해주세요"
          className="login"
          id="email"
          onBlur={() => {
            setIsFocusEmail(true);
          }}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        {!isEmailValid && isFocusEmail && (
          <p>아이디는 이메일 형식으로 입력해주세요</p>
        )}
      </div>
      <div className="login__input-check">
        <InputCommon
          placeholder="비밀번호를 입력해주세요"
          className="login"
          type="password"
          id="password"
          onBlur={() => {
            setIsFocusPassword(true);
          }}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        {!isPasswordValid && isFocusPassword && (
          <p>영문 대소문자, 숫자, 특수문자 포함 8~20자로 입력해주세요</p>
        )}
      </div>
      <div className="login__find">
        <Link to="">아이디/비밀번호 찾기 &gt;</Link>
      </div>
      <div className="login__button">
        <ButtonCommon
          design="form"
          onClick={onClickLogin}
          disabled={!isEmailValid | !isPasswordValid}
        >
          로그인
        </ButtonCommon>
        <ButtonCommon design="form weak">
          <Link to="/join">회원가입</Link>
        </ButtonCommon>
      </div>
    </form>
  );
};

export default LoginForm;
