import { useId } from "react";

const InputCheckbox = ({
  type = "text",
  className = "",
  disabled = false,
  checked,
  onChangeCheckhandler,
  checkAll = false,
}) => {
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
            onChange={onChangeCheckhandler}
          />
          <label htmlFor={`check_btn${uniqueId}`}></label>
        </>
      )}
    </>
  );
};

export default InputCheckbox;
