import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import Error from "./components/pages/error/Error";
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ErrorBoundary FallbackComponent={Error}>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </ErrorBoundary>
);
