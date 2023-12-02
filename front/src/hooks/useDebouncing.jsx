import { useEffect, useState } from "react";

//value에 함수도 가능할듯
//자동완성 api콜 하는 함수 자체를 value로
//value가 함수이려면..?ㅠㅠ 그냥 함수를 주면 실행될까?
// setQuantity(()=>{do Something});
//함수가 값을 반환하는 함수고 그걸 사용하는 것이면 가능할지도..?!

const useDebouncing = ({ value, initialState = 0, delay }) => {
  const [debouncing, setDebouncing] = useState(initialState);

  //어떤 값이 있는데 그 값이 들어올때마다 변경,
  //2초후에 값을 줌

  useEffect(() => {
    let debounced;

    debounced = setTimeout(() => {
      setDebouncing(value);
    }, delay);

    return () => clearTimeout(debounced);
  }, [value, delay]);

  return { debouncedValue: debouncing };
};

export default useDebouncing;

//한 컴포넌트에서 여러값을 주고 다른값을 받는 커스텀훅.. 사용하려면 ??
//초기 선언할 때 다른 값을 주면 될까...?
//아니면 아래같이 배열로? useEffect 내부에서 쓴다고 Fn손실?? 에러
// assignments to the 'setdebouncedfn' variable from inside react hook useeffect will be lost after each render. to preserve the value over time, store it in a useref hook and keep the mutable value in the '.current' property. otherwise, you can move this variable directly inside useeffect.

// const useDebouncing = ({ initialState = 0, value, delay }) => {
//   const [debouncedValue, setDebouncedValue] = useState(initialState);
//   //어떤 값이 있는데 그 값이 들어올때마다 변경,
//   //2초후에 값을 줌

//   let setDebouncedFn;
//   useEffect(() => {
//     const deId = setTimeout(() => {
//       if (typeof value === "function") {
//         setDebouncedFn = (fn) => {
//           return fn();
//         };
//       } else {
//         setDebouncedFn = (val) => {
//           setDebouncedValue(val);
//         };
//       }
//       setDebouncedValue(value);
//     }, delay);

//     return clearTimeout(deId);
//   }, [value, delay]);

//   return [debouncedValue, setDebouncedFn];
// };

// export default useDebouncing;
