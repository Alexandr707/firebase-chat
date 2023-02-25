import { createSlice } from "@reduxjs/toolkit";
import vars from "../../Constants/vars";

const initialState = {
  status: vars.LOADING,
  userId: null,
  userInfo: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      if (!action.payload.userId || !action.payload.userInfo)
        throw new Error("Missing user data");
      state.status = vars.AUTHORIZED;
      state.userId = action.payload.userId;
      state.userInfo = action.payload.userInfo;
    },
    userUnauthorized(state) {
      state.status = vars.UNAUTHORIZED;
      state.userId = null;
      state.userInfo = null;
    },
  },
});

export default userSlice.reducer;
export const { setUser, userUnauthorized } = userSlice.actions;
