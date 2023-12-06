import { useSelector } from "react-redux";

const DeleveryInfo = () => {
  const consumerInfo = useSelector((state) => state.user.userInfo);

  return (
    <div className="title title__element">
      <div className="flex flex__element-left">
        <div>{consumerInfo[0].username}</div>
        <div>{consumerInfo[0].email}</div>
        <div>{consumerInfo[0].address}</div>
        <div>{consumerInfo[0].phone_number}</div>
        <div>{consumerInfo[0].my_carbon}</div>
      </div>
    </div>
  );
};

export default DeleveryInfo;
