import ButtonCommon from "../../UI/ButtonCommon";
import InputCommon from "../../UI/InputCommon";

const DeleveryInfo = () => {
  return (
    <div className="title title__element">
      <div className="flex flex__element-left">
        <div>배송주소</div>
        <div>서울시 마포구 홍대입구 </div>
      </div>
      <div className="flex flex__element-left">
        <div>이름</div>
        <InputCommon className="white-square" defaultValue="김유저" />
      </div>
      <div className="flex flex__element-left">
        <div>연락처</div>
        <InputCommon className="white-square" defaultValue="010-0000-0000" />
      </div>
      <div className="flex flex__element-left">
        <div>요청사항</div>
        <div className="require__info">
          <InputCommon className="white-square" defaultValue="문 앞" />
          <ButtonCommon design="ssmall"> 변경 </ButtonCommon>
        </div>
      </div>
    </div>
  );
};

export default DeleveryInfo;
