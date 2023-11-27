import { useId, useState } from "react";

const InputCheckbox = ({
  label = "",
  type = "text",
  id,
  defaultValue,
  value = undefined,
  className = "",
  placeholder = "",
  required = false,
  disabled = false,
  onValueChange,
  checkAll = false,
}) => {
  const [inputNum, setInputNum] = useState(1);
  const [checked, setChecked] = useState(false);
  const uniqueId = useId();

  return (
    <>
      {type === "checkbox" && (
        <>
          <input
            type={type}
            id={`check_btn${uniqueId}`}
            className={`input ${className}`}
            checked={checked}
            onChange={() => {
              // checkAll && setChecked(true);
              setChecked((prev) => !prev);
              onValueChange(checked);
            }}
          />
          <label htmlFor={`check_btn${uniqueId}`}></label>
        </>
      )}
    </>
  );
};

export default InputCheckbox;
