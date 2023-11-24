import { Link } from "react-router-dom";
import ButtonCommon from "../../UI/ButtonCommon";
import InputCommon from "../../UI/InputCommon";

const Login = () => {
  return (
    <div className="login__wrapper">
      <div className="login">
        <div className="login__head">로그인</div>
        <hr />
        <form className="login__input">
          <InputCommon
            placeholder="이메일을 입력해주세요"
            className="login"
            id="id"
          />
          <InputCommon
            placeholder="비밀번호를 입력해주세요"
            className="login"
            type="password"
            id="password"
          />
          <div className="login__find">
            <Link to="">아이디/비밀번호 찾기</Link>
          </div>
          <div className="login__button">
            <ButtonCommon design="form" type="submit">
              로그인
            </ButtonCommon>
            <ButtonCommon design="form weak">
              <Link to="/join">회원가입</Link>
            </ButtonCommon>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
