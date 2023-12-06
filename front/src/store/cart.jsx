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
    //전제조건은 cartItems에 있다는것! 없으면 안됨... 에러분기(?)
    //필요한것 item_id와 quantity만. quantity만 업뎃하면 됨.
    updateCartQuantity(state, action) {
      console.log("updateCartQuantity", action.payload);
      console.log("newItemId", action.payload.item_id);
      const newItemId = action.payload.item_id;
      const existedCartItemIndex = state.cartItems.findIndex(
        (cart) => cart.item_id === newItemId
      );
      const existedCheckedItemIndex = state.cartCheckedList.findIndex(
        (cart) => cart.item_id === newItemId
      );
      if (existedCartItemIndex > 0) {
        //있다면 수량변경
        const updatedCartQuantity = action.payload.quantity;
        state.cartItems[existedCartItemIndex].quantity = updatedCartQuantity;
      }
      if (existedCheckedItemIndex > 0) {
        const updatedCheckQuantity = action.payload.quantity;
        state.cartCheckedList[existedCartItemIndex].quantity =
          updatedCheckQuantity;
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
      //만약 있다면 return
      const newCartCheckedList = action.payload;
      const existCartItem = state.cartCheckedList.find(
        (list) => list.item_id === action.payload.item_id
      );
      if (!existCartItem) {
        state.cartCheckedList.push(newCartCheckedList);
      }
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
      console.log("update Total");
      console.log(state.cartCheckedList);

      if (state?.cartCheckedList) {
        let updatedTotal = state?.cartCheckedList.reduce(
          (acc, cur) => {
            console.log("quantity", cur.quantity, "price", cur.price);
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
