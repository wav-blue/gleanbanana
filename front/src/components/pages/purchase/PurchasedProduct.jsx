import { useSelector } from "react-redux";

const PurchasedProduct = ({ list }) => {
  console.log(list);
  return (
    <>
      <div className="title title__element">
        <div className="flex flex__element-left">
          {list.item_name} {list.quantity} (개) 바나나 인덱스{" "}
          {list.banana_index / 100}, :{" "}
          {(list.price * list.quantity).toLocaleString()} 원
        </div>
      </div>
    </>
  );
};

export default PurchasedProduct;
