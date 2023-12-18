import { useEffect, useMemo, useState } from "react";
import useApi from "../../../hooks/useApi";
import { useSelector } from "react-redux";

const ConsumerInfo = () => {
  const userInfo = useSelector((state) => state.user.userInfo.userInfo);
  const userId = useSelector((state) => state.user.userId);

  const { trigger, result } = useApi({
    method: "get",
    path: `/current`,
    shouldInitFetch: false,
  });

  useEffect(() => {
    trigger({
      method: "get",
      path: `/current`,
      applyResult: true,
      isShowBoundary: true,
    });
  }, [userId]);

  let consumerInfo;

  if (userInfo) {
    consumerInfo = userInfo && Object.entries(userInfo);
  }

  return (
    <div className="title title__element">
      {consumerInfo?.map(([name, value], idx) => (
        <div className="flex flex__element-left" key={`consumer-${idx}`}>
          <div>{name}</div>
          <div>{value}</div>
        </div>
      ))}
    </div>
  );
};

export default ConsumerInfo;
