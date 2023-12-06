import { configureStore } from "@reduxjs/toolkit";
import userLoginReducer from "./userLogin";
import cartReducer from "./cart";
import likeReducer from "./like";
import purchaseReducer from "./purchase";
import orderReducer from "./order";

const store = configureStore({
  reducer: {
    user: userLoginReducer,
    cart: cartReducer,
    like: likeReducer,
    purchase: purchaseReducer,
    order: orderReducer,
  },
});

export default store;
