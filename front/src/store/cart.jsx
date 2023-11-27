import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  cartCheckedList: [],
  totalPrice: 0,
  totalDeliveryFee: 0,
  totalBananaIndex: 0,
  testArr: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    //장바구니에서 수량을 변경했을 시 사용되는 로직(?)
    //수량 변경하면 가격, 바나나 인덱스도 변경되어야 함.
    addToCart(state, action) {
      console.log("addToCart는 성공적!");
      console.log(action.payload);
      const newItem = action.payload;
      const existedItem = state.cartItems.find(
        (item) => item.id === newItem.id
      );
      if (!existedItem) {
        state.cartItems.push(newItem);
      } else if (existedItem) {
        existedItem.quantity = existedItem.quantity + +action.payload.quantity;
      }
    },
    //장바구니에서 check했을 때 사용되는 로직
    addToCheckedList(state, action) {
      state.cartCheckedList.push(action.payload);
      // cartSlice.caseReducers.calculateTotal();
    },

    //장바구니에서 check 해제했을 때 사용되는 로직
    removeFromCheckedList(state, action) {
      state.cartCheckedList.filter((item) => item.id !== action.payload.id);
      // cartSlice.caseReducers.calculateTotal();
    },
    removeAllFromCheckedList(state, action) {
      //전체 선택해제 눌렀을 경우
      //cartItems빼고 모두 초기화
    },

    // calculateTotal(state) {
    //   state.totalBananaIndex = state?.cartCheckedList.reduce(
    //     (acc, cur) => acc + cur.bananaIdx * cur.quantity,
    //     0
    //   );
    //   state.totalPrice = state?.cartCheckedList.reduce(
    //     (acc, cur) => acc + cur.itemPrice * cur.quantity,
    //     0
    //   );
    // },
  },
});
export const cartActions = cartSlice.actions;

export default cartSlice.reducer;

//createSelector로 상품의 수량만 보여주는 로직 구성 필요
export const cartQuantitySelector = (state) =>
  state.cart.cartItems || initialState.cart.cartItems;
