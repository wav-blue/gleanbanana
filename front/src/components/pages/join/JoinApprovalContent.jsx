import { useState } from "react";
import InputCheckbox from "../../UI/InputCheckbox";

const JoinApprovalContent = ({ approval }) => {
  const [isChecked, setIsChecked] = useState(false);
  const onCheckChange = () => {
    setIsChecked((prev) => !prev);
  };
  return (
    <label className="join__approval--check">
      <InputCheckbox
        type="checkbox"
        // required={approval.required}
        className="checkInput"
        checked={isChecked}
        onChangeCheckhandler={onCheckChange}
      />
      {approval.content}
    </label>
  );
};

export default JoinApprovalContent;
