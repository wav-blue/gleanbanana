import { createSlice } from "@reduxjs/toolkit";

const initialState = { userInfo: "" };

const userLoginSlice = createSlice({
  name: "userLogin",
  initialState: initialState,
  reducers: {
    loginUser(state, action) {
      console.log("userInfo 저장", action.payload);
      state.userInfo = action.payload;
    },
    logoutUser(state) {
      state.userInfo = "";
    },
  },
});

export const userLoginActions = userLoginSlice.actions;

export default userLoginSlice.reducer;
