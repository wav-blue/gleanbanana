import useApi from "../hooks/useApi";
import { cartActions } from "./cart";

export const addToCart = (data) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const result = new Promise((res, rej) => {
        setTimeout(() => {
          res("Promise는 성공적!");
        }, 2000);
      });
      // const { trigger } = useApi({
      //   method: "post",
      //   path: "/cart",
      //   data: {},
      //   shouldInitFetch: false,
      // });
      // const result = await trigger({
      //   method: "post",
      //   path: "/cart",
      //   data: data,
      //   applyResult: true,
      //   isShowBoundary: false,
      //   shouldSetError: false,
      // });
      return result;
    };
    try {
      //비동기 함수 작동
      const testFetchData = await fetchData();
      //비동기 완료되어 promise값이 돌아오면 해당 값으로 dispatch

      dispatch(
        cartActions.addToCart({
          data,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };
};

export const getCart = () => {
  return async (dispatch, useApi) => {
    const fetchData = async () => {
      const result = new Promise((res, rej) => {
        setTimeout(() => {
          res("Promise는 성공적!");
        }, 2000);
      });
      // const { trigger } = useApi({
      //   method: "post",
      //   path: "/cart",
      //   data: {},
      //   shouldInitFetch: false,
      // });
      // const result = await trigger({
      //   method: "post",
      //   path: "/cart",
      //   data: data,
      //   applyResult: true,
      //   isShowBoundary: false,
      //   shouldSetError: false,
      // });
      return result;
    };
    try {
      //비동기 함수 작동
      const testFetchData = await fetchData();
      //비동기 완료되어 promise값이 돌아오면 해당 값으로 dispatch

      dispatch(
        cartActions.addToCart({
          data,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };
};
