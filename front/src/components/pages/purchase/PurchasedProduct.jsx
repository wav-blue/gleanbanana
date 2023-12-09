const PurchasedProduct = ({ list }) => {
  return (
    <>
      <div>
        {list.map((li, idx) => (
          <div className="title title__element" key={`list-${idx}`}>
            <div className="flex flex__element-left">
              {li.item_name} {li.quantity} (개) 바나나 인덱스{" "}
              {li.banana_index / 100}, :{" "}
              {(li.price * li.quantity).toLocaleString()} 원
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PurchasedProduct;
