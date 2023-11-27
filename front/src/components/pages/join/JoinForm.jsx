import ButtonCommon from "../../UI/ButtonCommon";
import InputCommon from "../../UI/InputCommon";
import JoinAddress from "./JoinAddress";
import JoinApproval from "./JoinApproval";
import JoinEmail from "./JoinEmail";
import JoinPassword from "./JoinPassword";

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
  return (
    <form className="join__input">
      <JoinEmail />
      <JoinPassword />
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
      <JoinAddress />
      <hr />
      <JoinApproval />
      <div className="join__button">
        <ButtonCommon design="form" type="submit">
          가입하기
        </ButtonCommon>
      </div>
    </form>
  );
};

export default JoinForm;
