import ProductCard from "./ProductCard";
import Categories from "../home/Categories";
import { useEffect, useState } from "react";
import useApi from "../../../hooks/useApi";
import { useRef } from "react";
import SkeletonProductCard from "./SkeletonProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [load, setLoad] = useState(false);
  const pageEnd = useRef();
  const imgRef = useRef(null);
  const observerRef = useRef();

  //api통신 useApi훅
  const { trigger, result, reqIdentifier, loading, error } = useApi({
    method: "get",
    path: "/items",
    data: {},
    shouldInitFetch: false,
  });

  // GET요청 / products;
  useEffect(() => {
    // 기준 이거 말고 어떻게 잡으면 좋을지 고민해보기
    if (page < 14) {
      trigger({
        method: "get",
        path: `/items?pageNum=${page}`,
        applyResult: true,
        isShowBoundary: true,
      });
      setLoad(true);
    }
  }, [page]);

  useEffect(() => {
    if (load) {
      //로딩되었을 때만 실행
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setPage((prev) => prev + 1);
          }
        },
        { threshold: 1 }
      );
      //옵져버 탐색 시작
      observer.observe(pageEnd.current);
    }
  }, [load]);

  useEffect(() => {
    if (reqIdentifier === "getData") {
      console.log(result);
      setProducts((prev) => [...prev, ...result.data]);
    }
  }, [result.data]);

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
