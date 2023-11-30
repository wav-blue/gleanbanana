// import { useEffect, useState } from "react";
// import useApi from "../../../hooks/useApi";
// import Product from "./Product";
// import Card from "../../UI/Card";
import ProductCard from "./ProductCard";
import tomato from "../../../assets/tomato.png";
import salad from "../../../assets/salad.png";
import peanut from "../../../assets/peanut.png";
import oats from "../../../assets/oats.png";
import banana from "../../../assets/banana.png";
import Categories from "../home/Categories";
import { useEffect, useState } from "react";
import useApi from "../../../hooks/useApi";
import axios from "axios";

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
    // trigger({
    //   method: "get",
    //   path: "/api/items",
    //   data: null,
    //   applyResult: true,
    //   isShowBoundary: false,
    //   shouldSetError: false,
    // });
    axios.get("/api/items").then((data) => {
      console.log(data);
      return setProducts(data.data);
    });
  }, []);

  //가져온 products마다 product 카드 보여줌
  //product는 상세페이지
  // useEffect(() => {
  //   if (reqIdentifier === "getData") {
  //     console.log(products);
  //     return setProducts(result);
  //   }
  // }, [result, reqIdentifier, products]);

  //경로가 ?category=dairy일떄 요청?

  return (
    <div className="products__wrapper">
      <Categories showAllBtn={false} />
      <ul className="products">
        {products &&
          products?.map((product, idx) => (
            <li key={`product-${idx}`}>
              <ProductCard
                id={product.item_id}
                src={product.image_url}
                itemName={product.item_name}
                itemPrice={product.price}
                bananaImg={banana}
                bananaIdx={product.banana_index}
              />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Products;
