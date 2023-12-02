import { useState } from "react";

//value에 함수도 가능할듯
//자동완성 api콜 하는 함수 자체를 value로
const useDebouncing = ({ initialState, value, delay }) => {
  const [debouncedValue, setDebouncedValue] = useState(initialState);

  //어떤 값이 있는데 그 값이 들어올때마다 변경,
  //2초후에 값을 줌
  const debounceFn = () => {
    setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
  };
  return [debouncedValue, debounceFn];
};
export default useDebouncing;
