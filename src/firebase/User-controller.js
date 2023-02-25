import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { dispatch, setUser, userUnauthorized } from "../redux/store";

export default class {
  constructor(auth, store) {
    this.auth = auth;
    this.store = store;
    this.subscribers = [];
  }

  async signin({ email, pass, userInfo }) {
    if (!userInfo) throw new Error("Missing user information");
    const userCredential = await createUserWithEmailAndPassword(
      this.auth,
      email,
      pass
    );
    if (userCredential.user) {
      userInfo.uid = userCredential.user.uid;
      userInfo.email = email;
      userInfo.timestamp = serverTimestamp();
      console.log(
        "[try create new user in storage]",
        await setDoc(doc(this.store, "users", userInfo.uid), userInfo)
      );
    }
    return userCredential.user;
  }

  async updateUser(userInfo) {
    console.log(
      "[try create new user in storage]",
      await setDoc(doc(this.store, "users", userInfo.uid), userInfo)
    );
  }

  async login({ email, pass }) {
    const userCredential = await signInWithEmailAndPassword(
      this.auth,
      email,
      pass
    );
    const userInfo = await getDoc(
      doc(this.store, "users", userCredential.user.uid)
    );
    return { user: userCredential.user.uid, userInfo };
  }

  onChange(cb) {
    this.subscribers.push(cb);
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        getDoc(doc(this.store, "users", user.uid)).then((userSnaphot) => {
          if (userSnaphot.exists()) {
            const data = userSnaphot.data();
            data.timestamp = data.timestamp * 1000;
            dispatch(
              setUser({
                userId: user.uid,
                userInfo: data,
              })
            );
          }
        });
        this.subscribers.forEach((sb) => sb(user));
      } else {
        dispatch(userUnauthorized(null));
        this.subscribers.forEach((sb) => sb(null));
      }
    });
  }

  offChange(cb) {
    this.subscribers = this.subscribers.filter((handler) => handler !== cb);
  }

  logOut() {
    this.auth.signOut();
  }
}
