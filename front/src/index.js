import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    {/* store를 구독 */}
    <Provider store={store}>
      {/* store값이 redux에 저장될 때까지 app 렌더링 지연 */}
      <App />
    </Provider>
  </BrowserRouter>
);
