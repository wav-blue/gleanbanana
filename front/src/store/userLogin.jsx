import { createSlice } from "@reduxjs/toolkit";

const initialState = { userId: "", userInfo: {} };

const userLoginSlice = createSlice({
  name: "userLogin",
  initialState: initialState,
  reducers: {
    loginUser(state, action) {
      console.log("userInfo 저장", action.payload);
      state.userId = action.payload;
    },
    logoutUser(state) {
      state.userInfo = {};
      state.userId = "";
    },
    getUserInfo(state, action) {
      state.userInfo = action.payload;
    },
  },
});

export const userLoginActions = userLoginSlice.actions;

export default userLoginSlice.reducer;
