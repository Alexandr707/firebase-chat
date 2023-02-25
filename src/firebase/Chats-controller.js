import { get, onValue, push, ref, set, update } from "firebase/database";
import { message } from ".";

import { dispatch, removeChat, setChats, setCurrentChat } from "../redux/store";

export default class {
  constructor(auth, db) {
    this.auth = auth;
    this.db = db;
  }

  init() {
    onValue(ref(this.db, "chats"), (snapshot) => {
      if (snapshot.exists()) {
        dispatch(setChats(this.snapshotToArray(snapshot.val())));
      }
    });
  }

  snapshotToArray(sn) {
    const keys = Object.keys(sn);
    return keys.reduce((acc, k) => {
      acc.push({ cid: k, ...sn[k] });
      return acc;
    }, []);
  }

  createChat({ owner, moderators = {}, name }) {
    if (!owner || !name) throw new Error("Chat data is not full");

    const chatsRef = ref(this.db, "chats");
    const key = push(chatsRef, { owner, moderators, name }).key;
    key &&
      get(ref(this.db, `chats/${key}`))
        .then((data) => {
          if (data.exists()) {
            const newChat = data.val();
            newChat.cid = key;
            dispatch(setCurrentChat(newChat));
          }
        })
        .catch(console.error);
  }

  deleteChat(chatId) {
    message
      .deleteAllMessageInChat(chatId)
      .then(() => {
        const chatRef = ref(this.db, "chats/" + chatId);
        set(chatRef, null).then(() => dispatch(removeChat(chatId)));
      })
      .catch(console.error);
  }

  updateChatData(chatId, { name, moderators = {} }) {
    if (!chatId) throw new Error("Chat data is not full");
    const options = {};
    options[`/chats/${chatId}`] = {
      name,
      moderators,
      owner: this.auth.currentUser.uid,
    };
    console.log(options);
    update(ref(this.db), options).then(console.log);
  }
}
