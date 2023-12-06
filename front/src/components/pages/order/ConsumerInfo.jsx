import { useSelector } from "react-redux";

const ConsumerInfo = () => {
  const consumerInfo = useSelector((state) => state.user.userInfo);

  return (
    <div className="title title__element">
      <div className="flex flex__element-left">
        <div>{consumerInfo.name}</div>
        <div>{consumerInfo.value}</div>
      </div>
    </div>
  );
};

export default ConsumerInfo;
