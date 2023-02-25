import config from "./firebaseConfig";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getDocs, getFirestore, query } from "firebase/firestore";
import { getDatabase } from "firebase/database";

import _User from "./User-controller";
import Message from "./Message-controller";
import Chats from "./Chats-controller";

const app = initializeApp(config);

const auth = getAuth(app);

const db = getFirestore(app);

const realtimeDatabase = getDatabase(app);

export const User = new _User(auth, db);

export const message = new Message(auth, realtimeDatabase);

export const chats = new Chats(auth, realtimeDatabase);

export function init() {
  if (auth.currentUser) {
    chats.init();
    message.init();
  } else {
    throw new Error("User not autorized.");
  }
}

export async function getAllUsers() {
  const q = query(collection(db, "users"));
  const snapshot = await getDocs(q);
  const users = [];
  snapshot.forEach((u) => users.push(u.data()));
  return users;
}
