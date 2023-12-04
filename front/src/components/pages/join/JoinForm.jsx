import useApi from "../../../hooks/useApi";
import ButtonCommon from "../../UI/ButtonCommon";
import InputCommon from "../../UI/InputCommon";
import JoinAddress from "./JoinAddress";
import JoinApproval from "./JoinApproval";
import JoinEmail from "./JoinEmail";
import JoinPassword from "./JoinPassword";
import { useEffect, useState } from "react";

const JoinInputNoCheck = [
  {
    label: "이름",
    placeholder: "이름을 입력해주세요",
    className: "join",
    id: "username",
  },
  {
    label: "휴대폰 번호",
    placeholder: "숫자만 입력해주세요",
    type: "tel",
    id: "phone_number",
    className: "join",
  },
];

const JoinForm = () => {
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { trigger, result, reqIdentifier, loading, error } = useApi({
    method: "post",
    path: `/users/register`,
    data: {},
    shouldInitFetch: false,
  });
  const joinData = { email, password, username, address, phone_number };
  const onClickJoinHandler = () => {
    trigger({ data: joinData });
  };
  useEffect(() => {
    if (result.status === 201) {
    } else {
    }
  }, []);
  return (
    <form className="join__input">
      <JoinEmail email={email} setEmail={setEmail} />
      <JoinPassword password={password} setPassword={setPassword} />
      {JoinInputNoCheck.map((input, idx) => (
        <InputCommon
          label={input.label}
          placeholder={input.placeholder}
          type={input.type}
          id={input.id}
          className={input.className}
          required={true}
          key={`joinInput-${idx}`}
        />
      ))}
      <JoinAddress address={address} setAddress={setAddress} />
      <hr />
      <JoinApproval />
      <div className="join__button">
        <ButtonCommon design="form" onSubmit={onClickJoinHandler}>
          가입하기
        </ButtonCommon>
      </div>
    </form>
  );
};

export default JoinForm;
