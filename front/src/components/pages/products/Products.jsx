import ProductCard from "./ProductCard";
import Categories from "../home/Categories";
import { useEffect, useState } from "react";
import useApi from "../../../hooks/useApi";

const Products = () => {
  const [products, setProducts] = useState([]);
  //api통신 useApi훅
  const { trigger, result, reqIdentifier, loading, error } = useApi({
    method: "get",
    path: "/items",
    data: {},
    shouldInitFetch: false,
  });

  // GET요청 / products;
  useEffect(() => {
    trigger({
      method: "get",
      path: "/items",
      applyResult: true,
      isShowBoundary: true,
    });
  }, []);

  useEffect(() => {
    if (reqIdentifier === "getData") {
      console.log(result);
      setProducts(result?.data);
    }
  }, [result.data]);

  //경로가 ?category=dairy일떄 요청?

  return (
    <div className="products__wrapper">
      <Categories showAllBtn={false} />
      <ul className="products">
        {products &&
          products?.map((product, idx) => (
            <li key={`product-${idx}`}>
              <ProductCard product={product} />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Products;
