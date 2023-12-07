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
  const [consumerInfo, setConsumerInfo] = useState([
    {
      username: "",
      email: "",
      phone_number: "",
    },
  ]);
  const userId = useSelector((state) => state.user.userId);

  const { trigger, result } = useApi({
    method: "get",
    path: `/${userId}`,
    shouldInitFetch: false,
  });

  useEffect(() => {
    trigger({
      method: "get",
      path: `/${userId}`,
      applyResult: true,
      isShowBoundary: true,
    });
  }, [userId]);

  useEffect(() => {
    console.log("data: ", result?.data);
    if (result.data !== undefined) {
      setConsumerInfo(result.data[0]);
    }
  }, [result?.data]);

  useEffect(() => {
    console.log("consumerInfo: ", consumerInfo);
  }, [consumerInfo]);

  const keyList = [
    { name: "이름", search: "username" },
    { name: "이메일", search: "email" },
    { name: "연락처", search: "phone_number" },
  ];

  return (
    <div className="title title__element">
      {keyList.map((key, idx) => (
        <div className="flex flex__element-left" key={`consumer-${idx}`}>
          <div>{key.name}</div>
          <div>{consumerInfo[key.search]}</div>
        </div>
      ))}
    </div>
  );
};

export default ConsumerInfo;
