import { useEffect, useState } from "react";
import { API_FETCHER } from "../utils/axiosConfig";
import { useErrorBoundary } from "react-error-boundary";

const useApi = ({
  method = "get",
  path = "",
  data = {},
  shouldInitFetch = false,
}) => {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [reqIdentifier, setReqIdentifier] = useState("");
  const [error, setError] = useState(false);
  const [extra, setExtra] = useState("");
  const { showBoundary } = useErrorBoundary();

  const trigger = async ({
    method: triggerMethod = method,
    path: triggerPath = path,
    data: triggerData = data,
    applyResult = false,
    isShowBoundary = true,
    shouldSetError = true,
  }) => {
    setLoading(true);

    console.log("trigger 호출");
    setReqIdentifier(triggerMethod + "Data");
    try {
      const triggerResult = await API_FETCHER[triggerMethod](
        triggerPath,
        triggerData
      );

      if (applyResult) {
        setResult(triggerResult);
        return;
      }
      return triggerResult;
    } catch (err) {
      if (isShowBoundary) {
        //에러 바운더리를 보여줘야 할때만 보여줌
        showBoundary(err);
        return;
      }
      shouldSetError && setError(err);
      return;
    } finally {
      setLoading(false);
    }
  };

  // const sendRequest = async (url, method, data, login = false, extras = "") => {
  //   if (method === "post") {
  //     try {
  //       setLoading(true);
  //       setReqIdentifier(method + "Data");
  //       const res = await api.post(url, data);
  //       setResult(res);
  //     } catch (err) {
  //       showBoundary(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   if (method === "get") {
  //     try {
  //       setLoading(true);
  //       setReqIdentifier(method + "Data");
  //       const res = await api.get(url, data);
  //       setResult(res);
  //     } catch (err) {
  //       showBoundary(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   if (method === "put") {
  //     try {
  //       setLoading(true);
  //       setReqIdentifier(method + "Data");
  //       const res = await api.put(url, data);
  //       setResult(res);
  //       setExtra(extras);
  //     } catch (err) {
  //       showBoundary(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   if (method === "delete") {
  //     try {
  //       setLoading(true);
  //       setReqIdentifier(method + "Data");
  //       const res = await api.delete(url);
  //       console.log(res);
  //       setExtra(extras);
  //       setResult(res);
  //     } catch (err) {
  //       showBoundary(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  // };

  useEffect(() => {
    shouldInitFetch && console.log("초기 요청합니다!!", method, path);
    shouldInitFetch && trigger({ method, path, data });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { result, loading, reqIdentifier, extra, trigger, error };
};
export default useApi;
