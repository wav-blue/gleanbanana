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

  // useEffect(() => {
  //   console.log("data: ", result?.data);
  //   if (result.data !== undefined) {
  //     setConsumerInfo(result.data[0]);
  //   }
  // }, [result?.data]);

  // useEffect(() => {
  //   console.log("consumerInfo: ", consumerInfo);
  // }, [consumerInfo]);

  // const keyList = useMemo(
  //   () => [
  //     { name: "이름", search: "username" },
  //     { name: "이메일", search: "email" },
  //     { name: "연락처", search: "phone_number" },
  //   ],
  //   []
  // );
  const consumerInfo = Object.entries(userInfo);

  return (
    <div className="title title__element">
      {consumerInfo.map(([name, value], idx) => (
        <div className="flex flex__element-left" key={`consumer-${idx}`}>
          <div>{name}</div>
          <div>{value}</div>
        </div>
      ))}
    </div>
  );
};

export default ConsumerInfo;
