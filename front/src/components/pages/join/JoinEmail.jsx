import { useState } from "react";
import ButtonCommon from "../../UI/ButtonCommon";
import InputCommon from "../../UI/InputCommon";

const JoinEmail = () => {
  const [email, setEmail] = useState("");
  const [isFocusEmail, setIsFocusEmail] = useState(false);

  const validateEmail = (email) => {
    return email.match(
      /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/
    );
  };
  const isEmailValid = validateEmail(email);

  const handleClick = () => {
    //중복 확인 함수
  };

  return (
    <div className="join__input--button">
      <div className="join__input--check">
        <InputCommon
          label="이메일"
          placeholder="ex) banana@email.com"
          type="email"
          id="email"
          className="join"
          required={true}
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
      <ButtonCommon design="check" onClick={handleClick}>
        <span className="material-symbols-outlined">check</span>중복 확인
      </ButtonCommon>
    </div>
  );
};

export default JoinEmail;
