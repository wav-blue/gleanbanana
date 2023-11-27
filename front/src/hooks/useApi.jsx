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
  const timeout = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const trigger = async ({
    method: triggerMethod = method,
    path: triggerPath = path,
    data: triggerData = data,
    applyResult = false,
    isShowBoundary = true,
    shouldSetError = true,
    isDelay = false,
    delayTime = 0,
  }) => {
    setLoading(true);

    console.log("trigger 호출");
    setReqIdentifier(triggerMethod + "Data");
    try {
      //isDelay를 true로 설정할 경우
      //promise를 반환하는 timeout함수를걸어
      //요청을 delay시켜 비용절감 유도
      if (isDelay) {
        await timeout(delayTime);
      }
      const triggerResult = await API_FETCHER[triggerMethod](
        triggerPath,
        triggerData
      );

      if (applyResult) {
        setResult(triggerResult);
        return result;
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

  useEffect(() => {
    shouldInitFetch && console.log("초기 요청합니다!!", method, path);
    shouldInitFetch && trigger({ method, path, data });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { result, loading, reqIdentifier, extra, trigger, error };
};
export default useApi;
