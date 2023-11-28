import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./components/pages/home/Home";
import Login from "./components/pages/login/Login";
import Join from "./components/pages/join/Join";
import Like from "./components/pages/like/Like";
import MyPage from "./components/pages/mypage/MyPage";
import Order from "./components/pages/order/Order";
import "../src/styles/style.css";
import Products from "./components/pages/products/Products";
import Product from "./components/pages/products/Product";
import Carts from "./components/pages/cart/Carts";
import Purchase from "./components/pages/purchase/Purchase";
import Error from "./components/pages/error/Error";
import Error404 from "./components/pages/error/Error404";

function App() {
  return (
    <div className="app">
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
            <Route path="/purchase" element={<Purchase />} />
            <Route path="/Error" element={<Error />} />
            <Route path="/Error404" element={<Error404 />} />
          </Routes>
        </main>
        <footer className="footer">footer입니다</footer>
      </div>
    </div>
  );
}

export default App;
