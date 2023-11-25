import ButtonCommon from "../../UI/ButtonCommon";
import InputCommon from "../../UI/InputCommon";

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

const JoinApproval = [
  {
    required: true,
    content: (
      <div>
        전체 동의합니다.
        <p>
          선택항목에 동의하지 않은 경우도 회원가입 및 일반적인 서비스를 이용할
          수 있습니다.
        </p>
      </div>
    ),
  },
  { required: true, content: "이용약관 동의 (필수)" },
  { required: true, content: "개인정보 수집 이용 동의 (필수)" },
  { required: false, content: "개인정보 수집 이용 동의 (선택)" },
];

const Join = () => {
  return <div className="join__wrapper"></div>;
};

export default Join;