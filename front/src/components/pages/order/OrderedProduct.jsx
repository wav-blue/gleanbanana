import { useSelector } from "react-redux";
import useApi from "../../../hooks/useApi";

const OrderedProduct = () => {
  const userId = useSelector((state) => state.user.userId);
  // orderId 어케 가져오지
  const orderId = useSelector((state) => state);
  const { trigger, result } = useApi({
    method: "get",
    path: `/${userId}/order/${orderId}`,
    shouldInitFetch: true,
    initialResult: { data: [] },
  });

  return (
    <div className="title title__element">
      <div className="flex flex__element-left">상품명</div>
    </div>
  );
};

export default OrderedProduct;
