import { useEffect, useState } from "react";

//value에 함수도 가능할듯
//자동완성 api콜 하는 함수 자체를 value로
const useDebouncing = ({ value, delay }) => {
  const [quantity, setQuantity] = useState(0);

  //어떤 값이 있는데 그 값이 들어올때마다 변경,
  //2초후에 값을 줌

  useEffect(() => {
    let debounced;

    debounced = setTimeout(() => {
      setQuantity(value);
    }, delay);

    return () => clearTimeout(debounced);
  }, [value, delay]);

  return { debouncedQuantity: quantity };
};

export default useDebouncing;
