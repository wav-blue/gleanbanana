import { useId } from "react";

const InputCheckbox = ({
  type = "checkbox",
  className = "checkInput",
  disabled = false,
  checked,
  onChangeCheckhandler,
  value,
  checkAll = false,
}) => {
  const uniqueId = useId();
  const inputValue = value !== undefined ? value : "";

  return (
    <>
      <input
        type={type}
        id={`check_btn${uniqueId}`}
        className={`input ${className}`}
        checked={checked}
        value={inputValue}
        onChange={(e) => onChangeCheckhandler(e)}
      />
      <label htmlFor={`check_btn${uniqueId}`}></label>
    </>
  );
};

export default InputCheckbox;
