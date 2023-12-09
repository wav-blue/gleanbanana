import { useSelector } from "react-redux";
import InputCommon from "../../UI/InputCommon";

const DeliveryInfo = ({ disabled }) => {
  const userInfo = useSelector((state) => state.user?.userInfo?.userInfo);

  return (
    <div className="title title__element">
      {userInfo &&
        Object.entries(userInfo).map(([name, value], key) => (
          <div className="flex flex__element-left" key={`info-${key}`}>
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
