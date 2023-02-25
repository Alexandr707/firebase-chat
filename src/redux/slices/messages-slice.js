import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessages(state, action) {
      state.list = action.payload;
    },
    addMessage(state, action) {
      state.list.push(action.payload);
    },
    updateMessage(state, action) {
      const idx = state.list.find((m) => m.mid === action.payload.mid);
      if (idx > -1) {
        state.list[idx] = { ...state.list[idx], ...action.payload };
      }
    },
    removeMessage(state, action) {
      state.list = state.list.filter((m) => m.mid === action.payload);
    },
  },
});

export default messagesSlice.reducer;
export const { setMessages, addMessage, updateMessage, removeMessage } =
  messagesSlice.actions;
