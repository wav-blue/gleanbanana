import ProductCard from "./ProductCard";
import Categories from "../home/Categories";
import { useEffect, useState, useRef } from "react";
import useApi from "../../../hooks/useApi";
import SkeletonProductCard from "./SkeletonProductCard";
import { useLocation } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [load, setLoad] = useState(true);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const pageEnd = useRef();

  const location = useLocation();
  const category = new URLSearchParams(location.search).get("category");

  // Skeleton UI
  const imgRef = useRef(null);
  const observerRef = useRef();

  //api통신 useApi훅
  const { trigger, reqIdentifier, loading, error } = useApi({
    method: "get",
    path: "/items",
    data: {},
    shouldInitFetch: false,
  });

  // &category=${category}
  const getMoreData = async (page) => {
    // 조건 더 이쁘게 빼고 싶은데..
    setLoad(false);

    const moreData = await trigger({
      method: "get",
      path: `/items?pageNum=${page}`,
      applyResult: false,
      isShowBoundary: true,
    });

    setProducts((prev) => [...prev, ...moreData?.data]);

    console.log("moreData: ", moreData);
    setLoad(true);
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && load && hasMoreItems) {
        console.log("저기");
        const nextPage = page + 1;
        setPage(nextPage);
        getMoreData(nextPage);
      }
    });

    observer.observe(pageEnd.current);

    return () => {
      observer.disconnect();
    };
  }, [page, category, load]);

  return (
    <div className="products__wrapper">
      <Categories showAllBtn={false} />
      <ul className="products">
        {products ? (
          products.map((product, idx) => (
            <li key={`product-${idx}`}>
              <ProductCard product={product} />
            </li>
          ))
        ) : (
          <SkeletonProductCard />
        )}
      </ul>
      <div ref={pageEnd}></div>
    </div>
  );
};

export default Products;
