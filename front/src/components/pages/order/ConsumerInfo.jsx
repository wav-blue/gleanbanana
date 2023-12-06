import { useSelector } from "react-redux";

const ConsumerInfo = () => {
  const consumerInfo = useSelector((state) => state.user.userInfo);
  console.log("order/consumerInfo");
  return (
    <div className="title title__element">
      <div className="flex flex__element-left">
        <div>{consumerInfo[0].username}</div>
      </div>
    </div>
  );
};

export default ConsumerInfo;
