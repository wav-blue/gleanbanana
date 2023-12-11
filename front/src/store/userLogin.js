import { createSlice } from "@reduxjs/toolkit";

const initialState = { userId: "", userInfo: {} };

const userLoginSlice = createSlice({
  name: "userLogin",
  initialState: initialState,
  reducers: {
    loginUser(state, action) {
      state.userId = action.payload;
    },
    logoutUser(state) {
      Object.assign(state, initialState);
    },
    storeUserInfo(state, action) {
      state.userInfo = action.payload;
    },
  },
});

export const userLoginActions = userLoginSlice.actions;

export default userLoginSlice.reducer;
