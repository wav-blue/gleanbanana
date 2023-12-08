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

  const getMoreData = async (page) => {
    setLoad(false);
    const moreData = await trigger({
      method: "get",
      path: `/items?pageNum=${page}`,
      applyResult: false,
      isShowBoundary: true,
    });
    console.log(moreData);
    setProducts((prev) => [...prev, ...moreData.data]);
    setLoad(true);
  };

  useEffect(() => {
    // if (load) {
    //로딩되었을 때만 실행
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (load) {
          const nextPage = page + 1;
          setPage(nextPage);
          getMoreData(nextPage);
        }
      }
    });
    //옵져버 탐색 시작
    observer.observe(pageEnd.current);
    // }
    return () => {
      observer.disconnect();
    };
  }, [page, load]);

  //경로가 ?category=dairy일떄 요청?

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
