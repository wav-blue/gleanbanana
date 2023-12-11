import { useState, useMemo, useEffect, useCallback } from "react";
import ButtonCommon from "../../UI/ButtonCommon";
import InputCommon from "../../UI/InputCommon";
import Check from "../../icons/CheckMini";
import { validateEmail } from "../../../utils/validate";
import useApi from "../../../hooks/useApi";

const JoinEmail = ({ email, setEmail }) => {
  //블러처리 되었을때 true,
  const [isFocusEmail, setIsFocusEmail] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isEmailDuplicated, setIsEmailDuplicated] = useState(null);
  const [isDataChanged, setIsDataChanged] = useState(false);
  const { trigger, result, loading } = useApi({
    method: "get",
    path: `/users/email`,
    shouldInitFetch: false,
  });

  //email변경될 때마다 validateEmail을 실행해서 계산된 값을 리턴
  //email중복되었을때도 email이 변경되면 다시 null로 변경
  useEffect(() => {
    setIsEmailValid(validateEmail(email));
    setIsEmailDuplicated(null);
    setIsFocusEmail(false);
    console.log(email);
  }, [email]);

  const handleClick = async () => {
    if (!email) return;
    setIsDataChanged(true);
    const resultEmail = await trigger({
      applyResult: true,
      data: { email: email },
    });
    console.log(resultEmail);
  };

  useEffect(() => {
    //데이터가 변경되어 로딩중이 아닐때 isDuplicated가 새로운값으로 뒤집어 써야 함
    if (!loading && isDataChanged) {
      setIsEmailDuplicated(result?.data?.isDuplicated);
      setIsDataChanged(false);
    }
  }, [result, isFocusEmail, loading, isDataChanged]);

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
