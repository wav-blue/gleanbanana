import { useId, useState } from "react";

import InputBaseProps from "./InputBaseProps";

const InputCommon = (props = InputBaseProps) => {
  const {
    type,
    value = undefined,
    required,
    onChangeCheckhandler,
    className,
    label,
    id,
    onChange,
    defaultValue,
    onBlur,
    placeholder,
    disabled,
    onValueChange,
  } = props;
  const [inputNum, setInputNum] = useState(value | 1);
  const uniqueId = useId();

  return (
    <>
      <div className="input__wrapper">
        {label && (
          <label htmlFor={id}>
            {label}
            {required && <p>*</p>}
          </label>
        )}
        <input
          type={type}
          id={id}
          value={value}
          className={`input ${className}`}
          onBlur={onBlur}
          onChange={(e) => onChange(e)}
          defaultValue={defaultValue}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
        />
      </div>
    </>
  );
};

export default InputCommon;
