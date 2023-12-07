import { useId } from "react";

const InputCheckbox = ({
  type = "checkbox",
  className = "checkInput",
  disabled = false,
  checked,
  onChangeCheckhandler,
  checkAll = false,
}) => {
  const uniqueId = useId();

  return (
    <>
      <>
        <input
          type={type}
          id={`check_btn${uniqueId}`}
          className={`input ${className}`}
          checked={checked}
          onChange={onChangeCheckhandler}
        />
        <label htmlFor={`check_btn${uniqueId}`}></label>
      </>
    </>
  );
};

export default InputCheckbox;
