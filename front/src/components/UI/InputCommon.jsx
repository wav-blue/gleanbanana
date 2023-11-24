import { useState } from "react";

const InputCommon = ({
  label = "",
  type = "text",
  id,
  defaultValue,
  value = undefined,
  className = "",
  onValueChange,
}) => {
  const [inputNum, setInputNum] = useState(1);

  return (
    <>
      {type === "checkbox" && (
        <>
          <input type={type} id="check_btn" className={`input ${className}`} />
          <label htmlFor="check_btn"></label>
        </>
      )}
      {type !== "number" && type !== "checkbox" && (
        <div>
          {label && <label htmlFor={id}>{label}</label>}
          <input
            type={type}
            id={id}
            value={value}
            className={`input ${className}`}
            onChange={(e) => setInputNum(e)}
            defaultValue={defaultValue}
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
            onChange={(e) => setInputNum(e.target.value)}
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
