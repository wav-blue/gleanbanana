import banana from "../../../assets/banana.png";
import { useErrorBoundary } from "react-error-boundary";
import ButtonCommon from "../../UI/ButtonCommon";

const Error = () => {
  const { resetBoundary } = useErrorBoundary();
  return (
    <div className="error__wrapper">
      <img src={banana} alt="banana" />
      <div className="error">
        <div className="error__head">오류가 발생했습니다</div>
        <div className="error__content">
          요청하신 내용을 처리하지 못했습니다.
          <br />
          보내신 요청을 다시 확인해주세요.
        </div>
      </div>
      <ButtonCommon onClick={resetBoundary} className="error__button">
        이전으로 돌아가기
      </ButtonCommon>
    </div>
  );
};

export default Error;
