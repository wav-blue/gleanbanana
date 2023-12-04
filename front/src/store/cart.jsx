import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  cartCheckedList: [],
  cartTotal: { totalPrice: 0, totalDeliveryFee: 0, totalBananaIndex: 0 },
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    //cart api에서 가져와서 store에 저장하는 리듀서
    storeToCart(state, action) {
      console.log("store to cart!");
      state.cartItems = action.payload;
    },

    //고객이 productDetail 추가/ 장바구니에서수량변경때 사용
    //에러 나오는 이유

    //수량변경 트리거 되어야 하는 이유는
    //Cart에서 수량변경시!
    updateCartQuantity(state, action) {
      console.log("updateCartQuantity", action.payload);
      console.log("newItemId", action.payload.item_ids);
      const newItemId = action.payload.item_id;
      const existedItemIndex = state.cartItems.findIndex(
        (cart) => cart.item_id === newItemId
      );
      if (existedItemIndex !== -1) {
        //있다면 수량변경
        const updatedCartQuantity = action.payload.quantity;
        state.cartItems[existedItemIndex].quantity = updatedCartQuantity;
      }
    },
    removeFromCart(state, action) {
      // action.payload의 형태는 숫자만있는 리스트
      //해당 아이디를 모두 cartList에서 제거하는 로직
      const toRemoveIdList = action.payload;
      const removedCartList = state.cartItems.filter((items) =>
        toRemoveIdList.includes(items.item_id)
      );
      state.cartItems = removedCartList;
    },

    //장바구니에서 체크박스 선택했을 때
    addToCheckedList(state, action) {
      const newCartCheckedList = action.payload;
      state.cartCheckedList.push(newCartCheckedList);
    },
    //장바구니에서 check 해제했을 때
    removeFromCheckedList(state, action) {
      state.cartCheckedList = state.cartCheckedList.filter(
        (item) => item.item_id !== action.payload
      );
      console.log(state.cartCheckedList);
    },
    removeAllFromCheckedList(state) {
      //전체 선택해제 눌렀을 경우
      //cartItems빼고 모두 초기화
      state.cartCheckedList = [];
    },

    updateTotal(state) {
      console.log("update Total");
      if (state.cartCheckedList) {
        let updatedTotal = state.cartCheckedList.reduce(
          (acc, cur) => {
            return {
              totalPrice: acc.totalPrice + cur.totalPrice,
              totalDeliveryFee: acc.totalDeliveryFee + cur.deliveryFee,
              totalBananaIndex:
                acc.banana_index + cur.banana_index * cur.quantity,
            };
          },
          { totalPrice: 0, totalDeliveryFee: 0, totalBananaIndex: 0 }
        );
        console.log(updatedTotal);
        state.cartTotal = updatedTotal;
      }
    },
  },
});
export const cartActions = cartSlice.actions;

export default cartSlice.reducer;

//createSelector로 임시값 저장하여 리렌더링 최소화하기
export const quantitySelector = createSelector(
  (state) => state.cart.cartItems || initialState.cart.cartItems
);
