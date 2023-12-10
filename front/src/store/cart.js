import { createSelector, createSlice } from "@reduxjs/toolkit";

//리듀서를 너무 많이 나눠놨다
//updateCartQuantity의 목적을 체크 ...!
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
      state.cartItems = action.payload;
    },

    //Cart에서 수량변경시!
    //전제조건은 cartItems에 있다는것!
    //필요한것 item_id와 quantity만. quantity만 업뎃하면 됨.
    updateCartQuantity(state, action) {
      const newItemId = action.payload.item_id;
      const existedCartItemIndex = state.cartItems.findIndex(
        (cart) => cart.item_id === newItemId
      );
      //체크해놓은 카트 아이템과 내가 수량을 조절하고 있는 아이템이
      //포함되어있는지 체크하는 로직
      const existedCheckedItemIndex = state.cartCheckedList.findIndex(
        (cart) => cart.item_id === newItemId
      );
      //카트 quantity가 변경이 안되는듯!
      if (existedCartItemIndex >= 0) {
        //있다면 수량변경
        const updatedCartQuantity = action.payload.quantity;
        const updatedCart = state.cartItems[existedCartItemIndex];
        updatedCart.quantity = updatedCartQuantity;
      }
      if (existedCheckedItemIndex >= 0) {
        const updatedCartQuantity = action.payload.quantity;
        const updatedCart = state.cartCheckedList[existedCheckedItemIndex];
        updatedCart.quantity = updatedCartQuantity;
      }
    },
    removeFromCart(state, action) {
      // action.payload의 형태는 숫자만있는 리스트
      //해당 아이디를 모두 cartList에서 제거하는 로직
      const toRemoveIdList = action.payload;
      state.cartItems = state.cartItems.filter(
        (items) => !toRemoveIdList.includes(items.item_id)
      );
    },

    //장바구니에서 체크박스 선택했을 때
    addToCheckedList(state, action) {
      //만약 있다면 return
      const newCartCheckedList = action.payload;
      const existCartItem = state.cartCheckedList.find(
        (list) => list.item_id === action.payload.item_id
      );
      if (!existCartItem) {
        state.cartCheckedList.push(newCartCheckedList);
      }
      //중복된 아이템이 없으면? push
      //76번 체크됐을때만 코드가 해당
      //해제
    },
    //장바구니에서 check 해제했을 때
    removeFromCheckedList(state, action) {
      state.cartCheckedList = state.cartCheckedList.filter(
        (item) => item.item_id !== action.payload
      );
    },
    removeAllFromCheckedList(state) {
      //전체 선택해제 눌렀을 경우
      //cartItems빼고 모두 초기화
      state.cartCheckedList = [];
    },

    //cartCheckedList에서 price와 deleveryFee,bananaindex를 줘야함!
    updateTotal(state) {
      if (state?.cartCheckedList) {
        let updatedTotal = state?.cartCheckedList.reduce(
          (acc, cur) => {
            return {
              totalPrice: acc.totalPrice + cur.price * cur.quantity,
              totalDeliveryFee: acc.totalDeliveryFee + 2500,
              totalBananaIndex:
                acc.totalBananaIndex + cur.banana_index * cur.quantity,
            };
          },
          { totalPrice: 0, totalDeliveryFee: 0, totalBananaIndex: 0 }
        );
        state.cartTotal = updatedTotal;
      }
    },

    initializeCart(state) {
      state = initialState;
    },
  },
});
export const cartActions = cartSlice.actions;

export default cartSlice.reducer;

//createSelector로 임시값 저장하여 리렌더링 최소화하기
export const quantitySelector = createSelector(
  (state) => state.cart.cartItems || initialState.cart.cartItems
);
