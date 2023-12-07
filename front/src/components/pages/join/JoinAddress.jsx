import ButtonCommon from "../../UI/ButtonCommon";
import InputCommon from "../../UI/InputCommon";
import SearchMini from "../../icons/SearchMini";

import { useDaumPostcodePopup } from "react-daum-postcode";

const JoinAddress = ({ address, setAddress }) => {
  const PostCode = () => {
    const scriptUrl =
      "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    const open = useDaumPostcodePopup(scriptUrl);

    const handleComplete = (data) => {
      let fullAddress = data.address;
      let extraAddress = "";

      if (data.addressType === "R") {
        if (data.bname !== "") {
          extraAddress += data.bname;
        }
        if (data.buildingName !== "") {
          extraAddress +=
            extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
        }
        fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
      }
      setAddress(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    };

    const handleClick = (e) => {
      e.preventDefault();
      open({ onComplete: handleComplete });
    };
    return (
      <ButtonCommon design="check" onClick={handleClick}>
        <SearchMini />
        주소 검색
      </ButtonCommon>
    );
  };

  return (
    <div className="join__input--button">
      <InputCommon
        label="주소"
        placeholder="주소를 검색해주세요"
        className="join"
        value={address}
        required={true}
        disabled={true}
      />
      <PostCode />
    </div>
  );
};

export default JoinAddress;
