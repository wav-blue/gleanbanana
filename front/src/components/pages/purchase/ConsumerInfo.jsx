import { useEffect, useState } from "react";
import useApi from "../../../hooks/useApi";
import { useSelector } from "react-redux";

const consumerInfo = [
  { name: "이름", value: "김유저" },
  { name: "이메일", value: "user@banana.com" },
  { name: "연락처", value: "010-1111-2222" },
];

//올 데이터.... 이렇게 될지?
// const tableName = ["이름", "이메일", "연락처"];

const ConsumerInfo = () => {
  const [consumerInfo, setConsumerInfo] = useState([]);
  const userId = useSelector((state) => state.user.userId);

  const { trigger, result } = useApi({
    method: "get",
    path: `/${userId}`,
    shouldInitFetch: true,
    initialResult: { data: [] },
  });
  console.log(result);

  const getConsumerInfo = async () => {
    const fetchResult = await trigger({
      applyResult: true,
    });
    setConsumerInfo(fetchResult);
    console.log(fetchResult);
  };

  useEffect(() => {
    console.log(result);
    // getConsumerInfo();
    // trigger({ data: { currentUserId: userId } });
  }, [result]);

  // useEffect(() => {
  //   setConsumerInfo(result?.data);
  //   console.log(result.data);
  // }, [result?.data]);
  return (
    <div className="title title__element">
      {result.data.map((cons) => (
        <div className="flex flex__element-left">
          <div>{cons.username}</div>
          <div>{cons.address}</div>
        </div>
      ))}
    </div>
  );
};

export default ConsumerInfo;
