import { configureStore } from "@reduxjs/toolkit";
import userLoginReducer from "./userLogin";
import cartReducer from "./cart";
import likeReducer from "./like";

const store = configureStore({
  reducer: {
    user: userLoginReducer,
    cart: cartReducer,
    like: likeReducer,
  },
});

export default store;
