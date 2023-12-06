import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderedItems: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {
    //cart api에서 가져와서 store에 저장하는 리듀서
    storeToOrdered(state, action) {
      console.log("store to cart!");
      state.orderedItems = action.payload;
    },
  },
});
export const orderActions = orderSlice.actions;

export default orderSlice.reducer;
