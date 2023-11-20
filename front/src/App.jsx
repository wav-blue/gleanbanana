import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import SideLayout from "./components/layout/SideLayout";
import Home from "./components/pages/home/Home";
import "../src/styles/style.css";

function App() {
  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <Layout />
        </header>
        <main className="main">
          <SideLayout />
          <Routes>
            <Route path="/" exact element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </main>
        <footer className="footer">footer입니다</footer>
      </div>
    </div>
  );
}

export default App;
