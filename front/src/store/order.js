import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderedItems: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {
    //cart api에서 가져와서 store에 저장하는 리듀서
    storeToOrdered(state, action) {
      state.orderedItems = action.payload;
    },
    removeFromOrdered(state, action) {
      // action.payload의 형태는 숫자만있는 리스트
      //해당 아이디를 모두 cartList에서 제거하는 로직
      const toRemoveIdList = action.payload;
      state.orderedItems = state.orderedItems.filter(
        (items) => !toRemoveIdList.includes(items.item_id)
      );
    },
  },
});
export const orderActions = orderSlice.actions;

export default orderSlice.reducer;
