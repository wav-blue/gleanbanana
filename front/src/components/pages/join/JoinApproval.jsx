import { useState } from "react";
import InputCheckbox from "../../UI/InputCheckbox";
import JoinApprovalContent from "./JoinApprovalContent";

const JoinApprovalList = [
  { required: true, content: "이용약관 동의 (필수)", checkAll: false },
  {
    required: true,
    content: "개인정보 수집 이용 동의 (필수)",
    checkAll: false,
  },
  {
    required: false,
    content: "개인정보 수집 이용 동의 (선택)",
    checkAll: false,
  },
];

const JoinApproval = () => {
  const [isChecked, setIsChecked] = useState(false);
  const onCheckChange = () => {
    setIsChecked((prev) => !prev);
  };
  return (
    <div className="join__approval">
      <div className="join__approval__label">
        이용약관 동의
        <p>*</p>
      </div>
      <div className="join__approval__content">
        <label className="join__approval--check">
          <InputCheckbox
            type="checkbox"
            className="checkInput"
            checked={isChecked}
            onChangeCheckhandler={onCheckChange}
          />
          <div>
            전체 동의합니다.
            <p>
              선택항목에 동의하지 않은 경우도 회원가입 및 일반적인 서비스를
              이용할 수 있습니다.
            </p>
          </div>
        </label>
        {JoinApprovalList.map((approval, idx) => (
          <JoinApprovalContent
            key={`joinApproval-${idx}`}
            approval={approval}
          ></JoinApprovalContent>
        ))}
      </div>
    </div>
  );
};

export default JoinApproval;
