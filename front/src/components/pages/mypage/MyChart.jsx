import { useEffect, useState } from "react";
import useApi from "../../../hooks/useApi";

const MyChart = () => {
  const [max, setMax] = useState(null);
  const [min, setMin] = useState(null);
  const [count, setCount] = useState(null);

  const { trigger, result, reqIdentifier, loading, error } = useApi({
    method: "get",
    path: `/myPage`,
    shouldInitFetch: false,
  });

  useEffect(() => {
    const getData = async () => {
      await trigger({
        applyResult: true,
        isShowBoundary: true,
      });
    };
    getData();
  }, []);

  useEffect(() => {
    if (result?.data !== undefined) {
      console.log(result?.data.max_value);
      setMax(result?.data.max_value);
      setMin(result?.data.min_value);
      setCount(result?.data.recent_count);
    }
  }, [result?.data]);
  console.log(max, min, count);

  return (
    <div className="mychart__wrapper">
      <div className="mychart__head">나의 바나나 인덱스</div>
      <div className="mychart__description">
        <div className="mychart__card__wrapper">
          <div className="mychart__card__head">최대</div>
          <div className="mychart__card">{max ? max : 0}</div>
        </div>
        <div className="mychart__card__wrapper">
          <div className="mychart__card__head">최소</div>
          <div className="mychart__card">{min ? min : 0}</div>
        </div>
        <div className="mychart__card__wrapper">
          <div className="mychart__card__head">구매 횟수</div>
          <div className="mychart__card">{count ? count : 0}</div>
        </div>
      </div>
    </div>
  );
};

export default MyChart;
