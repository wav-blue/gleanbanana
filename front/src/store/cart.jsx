import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  cartCheckedList: [],
  totalPrice: 0,
  totalDeliveryFee: 0,
  totalBananaIndex: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    //장바구니에서 수량을 변경했을 시 사용되는 로직(?)
    //수량 변경하면 가격, 바나나 인덱스도 변경되어야 함.
    addToCart(state, action) {
      console.log("dispatch 실행됨!");
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
    //장바구니에서 체크박스 선택했을 때
    //총량표시(계산?)
    addToCheckedList(state, action) {
      const checkedItem = state.cartItems.find(
        (cart) => cart.id === action.payload.id
      );
      state.cartCheckedList.push(checkedItem);

      //여기서 numinput값이 변경될 경우는?
    },
    //quantity 변동시 (cartItems와 cartCheckedList모두 변경)
    changeQuantity(state, action) {
      const changedCartItem = state.cartItems.find(
        (cart) => cart.id === action.payload.id
      );
      const changedCheckedItem = state.cartCheckedList.find(
        (cart) => cart.id === action.payload.id
      );
      changedCartItem.quantity = action.payload.quantity;
      if (changedCheckedItem) {
        changedCheckedItem.quantity = action.payload.quantity;
      }
    },
    //장바구니에서 check 해제했을 때
    removeFromCheckedList(state, action) {
      state.cartCheckedList = state.cartCheckedList.filter(
        (item) => item.id !== action.payload.id
      );
      console.log(state.cartCheckedList);
    },
    removeAllFromCheckedList(state) {
      //전체 선택해제 눌렀을 경우
      //cartItems빼고 모두 초기화
      state.cartCheckedList = [];
    },

    updateTotal(state) {
      //cartCheckedList에 들어있는 모든 아이템의 bananaIndex
      console.log("update Total");
      state.totalBananaIndex = state.cartCheckedList.reduce(
        (acc, cur) => acc + cur.banana_index * cur.quantity,
        0
      );
      state.totalDeliveryFee = state.cartCheckedList.reduce(
        (acc, cur) => acc + cur.deliveryFee * cur.quantity,
        0
      );
      state.totalPrice = state.cartCheckedList.reduce(
        (acc, cur) => acc + cur.price * cur.quantity,
        0
      );
    },
  },
});
export const cartActions = cartSlice.actions;

export default cartSlice.reducer;

//createSelector로 임시값 저장하여 리렌더링 최소화하기
export const quantitySelector = createSelector(
  (state) => state.cart.cartItems || initialState.cart.cartItems
);
