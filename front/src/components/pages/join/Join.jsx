import ButtonCommon from "../../UI/ButtonCommon";
import InputCommon from "../../UI/InputCommon";
import JoinAddress from "./JoinAddress";
import JoinApproval from "./JoinApproval";
import JoinEmail from "./JoinEmail";

const JoinInputNoCheck = [
  {
    label: "비밀번호",
    placeholder: "비밀번호를 입력해주세요",
    type: "password",
    className: "join",
  },
  {
    label: "비밀번호 확인",
    placeholder: "비밀번호를 한 번 더 입력해주세요",
    type: "password",
    className: "join",
  },
  {
    label: "이름",
    placeholder: "이름을 입력해주세요",
    className: "join",
  },
  {
    label: "휴대폰 번호",
    placeholder: "숫자만 입력해주세요",
    type: "tel",
    className: "join",
  },
];

const Join = () => {
  return (
    <div className="join__wrapper">
      <div className="join">
        <div className="join__head">회원가입</div>
        <hr />
        <form className="join__input">
          <JoinEmail />
          {JoinInputNoCheck.map((input, idx) => (
            <InputCommon
              label={input.label}
              placeholder={input.placeholder}
              type={input.type}
              className={input.className}
              required={true}
              key={`joinInput-${idx}`}
            />
          ))}
          <JoinAddress />
          <hr />
          <JoinApproval />
          <ButtonCommon design="form" type="submit">
            가입하기
          </ButtonCommon>
        </form>
      </div>
    </div>
  );
};

export default Join;
