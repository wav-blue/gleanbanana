import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addCart(state, action) {
      state.push(action.payload);
    },
  },
});
export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
