import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  likeLists: [],
  totalLikes: 0,
};

const likeSlice = createSlice({
  name: "like",
  initialState: initialState,
  reducers: {
    storeToLike(state, action) {
      state.likeLists = action.payload;
    },
    addToLike(state, action) {
      const newLike = action.payload;
      const exitedLike = state.likeLists.find(
        (item) => item.item_id === newLike.item_id
      );

      if (exitedLike) {
        //like에 아이템이 있으면 return
        console.log("이미 찜목록에 해당 아이템 존재함");
        return;
      } else {
        //없으면 추가
        state.likeLists.push(newLike);
        console.log(newLike);
      }
    },
    removeFromLike(state, action) {
      state.likeLists = state.likeLists.filter(
        (like) => like.item_id !== action.payload.item_id
      );
    },
    initializeLikeState(state) {
      Object.assign(state, initialState);
    },
  },
});

export const likeActions = likeSlice.actions;

export default likeSlice.reducer;

const selectLike = (state) => state.like.likeLists;

export const likeStateSelector = createSelector(
  selectLike,
  (selectLike) => selectLike
);
