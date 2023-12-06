import { useState, useMemo, useEffect } from "react";
import ButtonCommon from "../../UI/ButtonCommon";
import InputCommon from "../../UI/InputCommon";
import Check from "../../icons/CheckMini";
import { validateEmail } from "../../../utils/validate";
import useApi from "../../../hooks/useApi";

const JoinEmail = ({ email, setEmail }) => {
  const [isFocusEmail, setIsFocusEmail] = useState(false);
  const [isEmailDuplicated, setIsEmailDuplicated] = useState(false);
  const { trigger, result, reqIdentifier, loading, error } = useApi({
    method: "post",
    path: `/users/email`,
    data: {},
    shouldInitFetch: false,
  });

  const isEmailValid = useMemo(() => validateEmail(email), [email]);

  const handleClick = () => {
    trigger({ data: { email: email } });
  };

  useEffect(() => {
    if (isFocusEmail && result.data === false) {
      //응답이 잘 오면 //이메일 포커스 안했을 때는 뜨지 않게. //응답이 false
      setIsEmailDuplicated(false);
    } else {
      //중복된 이메일 에러!
      setIsEmailDuplicated(true);
    }
  }, [result.data]);

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
        {!isEmailValid && isFocusEmail && isEmailDuplicated && (
          <p>중복된 이메일 주소입니다.</p>
        )}
      </div>
      <ButtonCommon
        design="check"
        onClick={handleClick}
        disabled={!isEmailValid && isFocusEmail && isEmailDuplicated}
      >
        <Check /> 중복 확인
      </ButtonCommon>
    </div>
  );
};

export default JoinEmail;
