import { configureStore } from "@reduxjs/toolkit";
import userLoginReducer from "./userLogin";
import cartReducer from "./cart";
import likeReducer from "./like";

const store = configureStore({
  reducer: {
    userLogin: userLoginReducer,
    cart: cartReducer,
    like: likeReducer,
  },
});

export default store;
