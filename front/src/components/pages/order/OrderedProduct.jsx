const OrderedProduct = ({ itemList }) => {
  return (
    <div className="title title__element">
      {itemList.map((item, idx) => (
        <div key={`item-${idx}`} className="flex flex__element-left">
          {item.item_name}
        </div>
      ))}
    </div>
  );
};

export default OrderedProduct;
