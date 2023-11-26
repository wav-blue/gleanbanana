import { configureStore } from "@reduxjs/toolkit";
import userLoginReducer from "./userLogin";
import cartReducer from "./cart";

const store = configureStore({
  reducer: {
    userLogin: userLoginReducer,
    cart: cartReducer,
  },
});

export default store;
