import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user-slice";
import chatsReducer from "./slices/chats-slice";
import messagesReducer from "./slices/messages-slice";

const store = configureStore({
  reducer: {
    user: userReducer,
    chats: chatsReducer,
    messages: messagesReducer,
  },
});

export default store;

export const dispatch = store.dispatch;

export { setUser, userUnauthorized } from "./slices/user-slice";
export { setChats, setCurrentChat, removeChat } from "./slices/chats-slice";
export {
  setMessages,
  addMessage,
  updateMessage,
  removeMessage,
} from "./slices/messages-slice";
