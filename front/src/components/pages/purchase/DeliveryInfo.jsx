import { useSelector } from "react-redux";
import InputCommon from "../../UI/InputCommon";

const DeliveryInfo = ({ disabled }) => {
  const userInfo = useSelector((state) => state.user.userInfo.userInfo);
  console.log(userInfo);

  return (
    <div className="title title__element">
      {Object.entries(userInfo).map(([name, value]) => (
        <div className="flex flex__element-left">
          <div>{name}</div>
          <InputCommon
            className="white-square"
            defaultValue={value}
            disabled={disabled}
          />
        </div>
      ))}
    </div>
  );
};

export default DeliveryInfo;
