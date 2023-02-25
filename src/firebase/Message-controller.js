import {
  push,
  ref,
  serverTimestamp,
  onValue,
  off,
  update,
  set,
} from "firebase/database";

import { dispatch, setMessages } from "../redux/store";

export default class {
  constructor(auth, db) {
    this.auth = auth;
    this.db = db;
    this.currentChat = null;
  }

  init() {}

  snapshotToArray(sn) {
    const keys = Object.keys(sn);
    return keys.reduce((acc, k) => {
      const msg = { mid: k, ...sn[k] };
      acc.push(msg);
      return acc;
    }, []);
  }

  isValidMessage(msg) {
    return Boolean(
      msg.uid && msg.cid && msg.text && msg.text.length && msg.nickname
    );
  }

  addMessage(msg) {
    if (!this.isValidMessage) throw new Error("Message is not valid");
    const chatRef = ref(this.db, `messages/${msg.cid}`);
    msg.timestamp = serverTimestamp();
    msg.lastEdited = null;
    msg.editorNickname = null;
    msg.editor = null;
    push(chatRef, msg).then(console.log).catch(console.error);
  }

  subscribeOnChatMessages(chatid, cb) {
    if (!chatid) {
      dispatch(setMessages([]));
    }
    if (this.currentChat) {
      this.unsubscribe();
      dispatch(setMessages([]));
    }

    this.currentChat = chatid;
    const chatRef = ref(this.db, `messages/${chatid}`);
    onValue(chatRef, (snapshot) => {
      if (snapshot.exists()) {
        const arr = this.snapshotToArray(snapshot.val());
        dispatch(setMessages(arr));
        cb && cb(arr);
      } else {
        dispatch(setMessages([]));
        cb && cb([]);
      }
    });
  }

  unsubscribe() {
    if (this.currentChat) {
      off(ref(this.db, `chats/${this.currentChat}`));
      this.currentChat = null;
    }
  }

  updateMessage(msg, user) {
    if (!this.isValidMessage) throw new Error("Message is not valid");
    if (!user) throw new Error("User data is enpty");

    msg.lastEdited = serverTimestamp();
    msg.editorNickname = user.userInfo.nickname;
    msg.editor = this.auth.currentUser.uid;

    const options = {};
    options[`/messages/${msg.cid}/${msg.mid}`] = msg;
    console.log("try update message ===>", options);

    update(ref(this.db), options);
  }

  deleteMessage(msg) {
    const { cid, mid } = msg;
    if (!cid || !mid) {
      console.warn("Check this ===>", msg);
      throw new Error("Some date not exist");
    }
    set(ref(this.db, `messages/${cid}/${mid}`), null);
    // update(ref(this.db), { [`/messages/${cid}/${mid}`]: null });
  }

  async deleteAllMessageInChat(chatId) {
    if (!chatId) throw new Error("ChatId is undefined");

    await set(ref(this.db, `messages/${chatId}`), null);
  }
}
