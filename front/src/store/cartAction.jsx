import useApi from "../hooks/useApi";
import { cartActions } from "./cart";

export const addToCart = (data) => {
  //
  return async (dispatch) => {
    // const { trigger } = useApi({
    //   method: "post",
    //   path: "/cart",
    //   data: {},
    //   shouldInitFetch: false,
    // });
    // await trigger({
    //   method: "post",
    //   path: "/cart",
    //   data: data,
    //   applyResult: true,
    //   isShowBoundary: false,
    //   shouldSetError: false,
    // });

    dispatch(
      cartActions.addToCart({
        data,
      })
    );
  };
};
