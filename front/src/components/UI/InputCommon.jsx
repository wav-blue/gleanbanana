import { useState } from "react";

const InputCommon = ({
  label = "",
  type = "text",
  id,
  value,
  className = "",
  onChange,
}) => {
  const [inputNum, setInputNum] = useState(0);

  const onClickBtn = (type) => {
    if (type === "plus") {
      setInputNum((prev) => prev + 1);
    } else if (type === "minus") {
      setInputNum((prev) => {
        if (prev === 0) return prev;
        return prev - 1;
      });
    }
  };

  return (
    <>
      {type !== "number" && (
        <div>
          {label && <label htmlFor={id}>{label}</label>}
          <input
            type={type}
            id={id}
            value={value}
            className={`input ${className}`}
            onChange={onChange}
          />
        </div>
      )}
      {type === "number" && (
        <div className="numberInput">
          <input
            type={type}
            id={id}
            value={inputNum}
            className={`input ${className}`}
            onChange={onChange}
          />
          <div className="upper" onClick={onClickBtn.bind(null, "plus")}>
            <span className="material-symbols-outlined ">
              keyboard_control_key
            </span>
          </div>
          <div className="down" onClick={onClickBtn.bind(null, "minus")}>
            <span className="material-symbols-outlined">stat_minus_1</span>
          </div>
        </div>
      )}
    </>
  );
};

export default InputCommon;
