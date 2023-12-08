import ProductCard from "./ProductCard";
import Categories from "../home/Categories";
import { useEffect, useState, useRef } from "react";
import useApi from "../../../hooks/useApi";
import SkeletonProductCard from "./SkeletonProductCard";
import { useSearchParams } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [load, setLoad] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const pageEnd = useRef();

  const category = searchParams.get("category");
  console.log(category);

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
    console.log("page: ", page);
    if (category === null) {
      const moreData = await trigger({
        method: "get",
        path: `/items?pageNum=${page}`,
        applyResult: false,
        isShowBoundary: true,
      });
      if (moreData?.data !== null) {
        setProducts((prev) => [...prev, ...moreData?.data]);
        setLoad(true);
      }
    } else {
      const moreData = await trigger({
        method: "get",
        path: `/items?pageNum=${page}&category=${category}`,
        applyResult: false,
        isShowBoundary: true,
      });
      if (moreData?.data !== null) {
        setProducts((prev) => [...prev, ...moreData?.data]);
        setLoad(true);
      }
    }
  };

  // 카테고리 바뀌면 products, page 전부 초기화
  // 첫번째 page만 불러와서 스크롤도 돌아가게
  useEffect(() => {
    if (category !== null) {
      searchParams.set("category", category);
      setProducts([]);
      getMoreData(1);
      setPage(1);
    }
  }, [category]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && load) {
        const nextPage = page + 1;
        setPage(nextPage);
        getMoreData(nextPage);
      }
    });
    console.log("data? : ", products);

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
