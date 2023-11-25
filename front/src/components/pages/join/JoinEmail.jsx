import ButtonCommon from "../../UI/ButtonCommon";
import InputCommon from "../../UI/InputCommon";

const JoinEmail = () => {
  return (
    <div className="join__input--check">
      <InputCommon
        label="이메일"
        placeholder="ex. banana@email.com"
        type="email"
        className="join"
        required={true}
      />
      <ButtonCommon design="check">
        <span className="material-symbols-outlined">check</span>중복 확인
      </ButtonCommon>
    </div>
  );
};

export default JoinEmail;
