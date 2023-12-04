import { useState } from "react";
import InputCommon from "../../UI/InputCommon";

const JoinPassword = () => {
  const [doublePassword, setDoublePassword] = useState("");
  const [isFocusPassword, setIsFocusPassword] = useState(false);
  const [isFocusDoublePassword, setIsFocusDoublePassword] = useState(false);

  const validatePassword = (password) => {
    return password.match(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/
    );
  };
  const validateDoublePassword = (doublePassword) => {
    return password === doublePassword;
  };

  const isPasswordValid = validatePassword(password);
  const isDoublePasswordValid = validateDoublePassword(doublePassword);

  return (
    <div className="join__input--password">
      <InputCommon
        label="비밀번호"
        placeholder="비밀번호를 입력해주세요"
        className="join"
        type="password"
        id="password"
        onBlur={() => {
          setIsFocusPassword(true);
        }}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        required={true}
      />
      {!isPasswordValid && isFocusPassword && (
        <p>영문 대소문자, 숫자, 특수문자 포함 8~20자로 입력해주세요</p>
      )}
      <InputCommon
        label="비밀번호 확인"
        placeholder="비밀번호를 한 번 더 입력해주세요"
        className="join"
        type="password"
        id="doublepassword"
        onBlur={() => {
          setIsFocusDoublePassword(true);
        }}
        onChange={(e) => {
          setDoublePassword(e.target.value);
        }}
        required={true}
      />
      {!isDoublePasswordValid && isFocusDoublePassword && (
        <p>비밀번호가 일치하지 않습니다</p>
      )}
    </div>
  );
};

export default JoinPassword;
