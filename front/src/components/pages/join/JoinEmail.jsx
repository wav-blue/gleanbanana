import { useState, useMemo, useEffect, useCallback } from "react";
import ButtonCommon from "../../UI/ButtonCommon";
import InputCommon from "../../UI/InputCommon";
import Check from "../../icons/CheckMini";
import { validateEmail } from "../../../utils/validate";
import useApi from "../../../hooks/useApi";

const JoinEmail = ({ email, setEmail }) => {
  //블러처리 되었을때 true,
  const [isFocusEmail, setIsFocusEmail] = useState(false);
  const [isEmailDuplicated, setIsEmailDuplicated] = useState(null);
  const { trigger, result, reqIdentifier, loading, error } = useApi({
    method: "get",
    path: `/users/email`,
    shouldInitFetch: false,
  });

  const isEmailValid = useMemo(() => validateEmail(email), [email]);
  console.log("isEmailValid : ", isEmailValid);
  const handleClick = async () => {
    if (!email) return;
    const result = await trigger({ applyResult: true, data: { email: email } });
    console.log(result);
  };

  useEffect(() => {
    if (isFocusEmail && result.data === 1) {
      //응답이 1이면 중복
      setIsEmailDuplicated(true);
    } else if (isFocusEmail && result.data === 0) {
      //응답이 0이면 중복안됨
      setIsEmailDuplicated(false);
    }
  }, [result.data, isFocusEmail]);

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
        {isFocusEmail && isEmailDuplicated && <p>중복된 이메일 주소입니다.</p>}
        {isFocusEmail && !isEmailDuplicated && result && (
          <p style={{ color: "green" }}>중복되지 않은 이메일 주소</p>
        )}
      </div>
      <ButtonCommon
        design="check"
        onClick={handleClick}
        disabled={!isEmailValid || isEmailDuplicated}
      >
        <Check /> 중복 확인
      </ButtonCommon>
    </div>
  );
};

export default JoinEmail;
