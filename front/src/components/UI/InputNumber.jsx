import { useId, useState } from "react";
import Up from "../icons/Up";
import Down from "../icons/Down";
import InputBaseProps from "./InputBaseProps";

const InputNumber = (props = InputBaseProps) => {
  const [inputNum, setInputNum] = useState(1);
  const uniqueId = useId();
  const { type = "number", className = "gray-square", onValueChange } = props;

  return (
    <>
      <div className="numberInput">
        <input
          type={type}
          id="numberInput"
          value={inputNum}
          className={`input ${className}`}
          onChange={(e) => {
            if (e.target.value < 1) return;
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
          <Up />
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
          <Down />
        </div>
      </div>
    </>
  );
};

export default InputNumber;
