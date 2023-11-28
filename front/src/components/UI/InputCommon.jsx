import { useEffect, useId, useState } from "react";

const InputCommon = ({
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
  onChangeCheckhandler,
  checkAll = false,
  checked = false,
}) => {
  const [inputNum, setInputNum] = useState(value | 1);
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
          <label htmlFor={`check_btn${uniqueId}`}>{checked}</label>
        </>
      )}
      {type !== "number" && type !== "checkbox" && (
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
            onChange={(e) => setInputNum(e)}
            defaultValue={defaultValue}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
          />
        </div>
      )}
      {type === "number" && (
        <div className="numberInput">
          <input
            type={type}
            id="numberInput"
            value={inputNum}
            className={`input ${className}`}
            onChange={(e) => {
              if (e.target.value < 1) return 1;
              setInputNum(e.target.value);
              onValueChange(e.target.value);
            }}
          />

          <div
            className="upper"
            onClick={() => {
              setInputNum((prev) => {
                return +prev + 1;
              });
              onValueChange(inputNum + 1);
            }}
          >
            <span className="material-symbols-outlined ">
              keyboard_control_key
            </span>
          </div>
          <div
            className="down"
            onClick={() => {
              setInputNum((prev) => {
                if (prev === 1) return prev;
                return +prev - 1;
              });
              if (inputNum === 1) return inputNum;
              onValueChange(inputNum - 1);
            }}
          >
            <span className="material-symbols-outlined">stat_minus_1</span>
          </div>
        </div>
      )}
    </>
  );
};

export default InputCommon;
