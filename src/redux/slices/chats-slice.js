import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  currentChat: null,
};

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setChats(state, action) {
      state.list = action.payload;
    },
    setCurrentChat(state, action) {
      state.currentChat = action.payload;
    },
    removeChat(state, action) {
      if (state.currentChat && state.currentChat.cid === action.payload)
        state.currentChat = null;
    },
  },
});

export default chatsSlice.reducer;
export const { setChats, setCurrentChat, removeChat } = chatsSlice.actions;
