import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toPurchaseList: [],
  toPurchaseListLength: 0,
  purchaseTotal: { totalPrice: 0, totalDeliveryFee: 0, totalBananaIndex: 0 },
};

const purchaseSlice = createSlice({
  name: "purchase",
  initialState: initialState,
  reducers: {
    //구매할 목록 덮어씌우기
    storeToPurchase(state, action) {
      state.toPurchaseList = [];
      state.toPurchaseList = action.payload;
    },
    updateTotal(state) {
      console.log("update Total");
      if (state?.toPurchaseList) {
        let updatedTotal = state?.toPurchaseList.reduce(
          (acc, cur) => {
            console.log({
              banana_index: cur.banana_index,
              price: cur.price,
              quantity: cur.quantity,
            });
            return {
              totalPrice: acc.totalPrice + cur.price * cur.quantity,
              totalDeliveryFee: acc.totalDeliveryFee + 2500,
              totalBananaIndex:
                acc.totalBananaIndex + cur.banana_index * cur.quantity,
            };
          },
          { totalPrice: 0, totalDeliveryFee: 0, totalBananaIndex: 0 }
        );
        console.log(updatedTotal);
        state.purchaseTotal = updatedTotal;
      }
    },
    clearPurchaseList(state) {
      state.toPurchaseList = initialState.toPurchaseList;
      state.purchaseTotal = initialState.purchaseTotal;
    },
  },
});

export const purchaseActions = purchaseSlice.actions;

export default purchaseSlice.reducer;
