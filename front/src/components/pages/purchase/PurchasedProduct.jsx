import { useSelector } from "react-redux";

const PurchasedProduct = ({ item_name }) => {
  console.log(item_name);
  return (
    <div className="title title__element">
      <div className="flex flex__element-left">{item_name}</div>
    </div>
  );
};

export default PurchasedProduct;
