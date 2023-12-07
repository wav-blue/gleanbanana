import InputCommon from "../../UI/InputCommon";

const deliveryList = [
  { name: "배송주소", value: "서울시 마포구 홍대입구" },
  { name: "이름", value: "김유저" },
  { name: "연락처", value: "010-0000-0000" },
  { name: "요청사항", value: "문 앞" },
];

const DeliveryInfo = ({ disabled }) => {
  return (
    <div className="title title__element">
      {deliveryList.map((del) => (
        <div className="flex flex__element-left">
          <div>{del.name}</div>
          <InputCommon
            className="white-square"
            defaultValue={del.value}
            disabled={disabled}
          />
        </div>
      ))}
    </div>
  );
};

export default DeliveryInfo;
