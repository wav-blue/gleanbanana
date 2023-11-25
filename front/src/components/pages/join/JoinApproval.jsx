import InputCommon from "../../UI/InputCommon";

const JoinApprovalList = [
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

const JoinApproval = () => {
  return (
    <div className="join__approval">
      <div className="join__approval__label">
        이용약관 동의
        <p>*</p>
      </div>
      <div className="join__approval__content">
        {JoinApprovalList.map((approval, idx) => (
          <label key={`joinApproval-${idx}`} className="join__approval--check">
            <InputCommon
              type="checkbox"
              required={approval.required}
              className="checkbox"
            />
            {approval.content}
          </label>
        ))}
      </div>
    </div>
  );
};

export default JoinApproval;
