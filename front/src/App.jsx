import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";
import "../src/styles/style.css";
import NotFound from "./components/pages/error/NotFound";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useApi from "./hooks/useApi";
import { userLoginActions } from "./store/userLogin";

const OrderedDetail = lazy(() =>
  import("./components/pages/order/OrderedDetail")
);
const Loading = lazy(() => import("./components/pages/loading/load"));
const Layout = lazy(() => import("./components/layout/Layout"));
const Home = lazy(() => import("./components/pages/home/Home"));
const Login = lazy(() => import("./components/pages/login/Login"));
const Join = lazy(() => import("./components/pages/join/Join"));
const Like = lazy(() => import("./components/pages/like/Like"));
const MyPage = lazy(() => import("./components/pages/mypage/MyPage"));
const Order = lazy(() => import("./components/pages/order/Order"));
const Products = lazy(() => import("./components/pages/products/Products"));
const Product = lazy(() => import("./components/pages/products/Product"));
const Carts = lazy(() => import("./components/pages/cart/Carts"));
const Purchase = lazy(() => import("./components/pages/purchase/Purchase"));
const About = lazy(() => import("./components/pages/about/About"));
const User = lazy(() => import("./components/pages/mypage/User"));
const Inquiry = lazy(() => import("./components/pages/mypage/Inquiry"));

const publicPathList = ["/join", "/cart"];

function App() {
  //새로고침할 때마다 호출이 됨
  //페이지 이동할 때도 호출이 되어야함

  const { trigger, result } = useApi({
    method: "get",
    path: "/current",
    shouldInitFetch: false,
  });
  const location = useLocation();

  //홈화면에서는 어떻게 해야?
  //로그아웃 버튼 클릭 => storeUserInfo발동 =>
  const fetchUserInfo = async () => {
    const fetchedUserInfo = await trigger({ isShowBoundary: false });
    if (!fetchedUserInfo) console.log("비로그인 유저!!!!");
    if (fetchedUserInfo) {
      dispatch(userLoginActions.storeUserInfo(fetchedUserInfo?.data));
      dispatch(userLoginActions.loginUser(fetchedUserInfo?.data.user_id));
    }
  };

  useEffect(() => {
    console.log(window.history);
  }, []);

  useEffect(() => {
    if (!publicPathList.includes(location.pathname)) {
      fetchUserInfo();
    }
  }, [location.pathname]);

  const dispatch = useDispatch();

  //shouldInitFetch 404에러 처리

  return (
    <div className="app">
      <Suspense fallback={<Loading />}>
        <div className="container">
          <header className="header">
            <Layout />
          </header>
          <main className="main">
            <Routes>
              <Route path="/" exact element={<Navigate to="/home" />} />
              <Route path="/home" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/login" element={<Login />} />
              <Route path="/join" element={<Join />} />
              <Route path="/like" element={<Like />} />
              <Route path="/cart" element={<Carts />} />
              <Route path="/myPage" element={<MyPage />} />
              <Route path="/order" element={<Order />} />
              <Route path="/order/:orderId" element={<OrderedDetail />} />
              <Route path="/purchase" element={<Purchase />} />
              <Route path="/about" element={<About />} />
              <Route path="/user" element={<User />} />
              <Route path="/inquiry" element={<Inquiry />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <footer className="footer">© 친환경에 반한 바나나</footer>
        </div>
      </Suspense>
    </div>
  );
}

export default App;
