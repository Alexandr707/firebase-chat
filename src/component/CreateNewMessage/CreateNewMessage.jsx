import { clsx } from "clsx";
import { useState } from "react";
import { useSelector } from "react-redux";
import { message } from "../../firebase";
import { SendMsgIcon } from "../Icons";
import Textarea from "../Textarea/Textarea";
import "./CreateNewMessage.scss";

function CreateNewMessage() {
  const [text, setText] = useState("");
  const { currentChat, user } = useSelector((state) => ({
    currentChat: state.chats.currentChat,
    user: state.user,
  }));

  if (!currentChat) return null;

  function submitHandler() {
    if (text.length && currentChat) {
      message.addMessage({
        cid: currentChat.cid,
        text,
        uid: user.userId,
        nickname: user.userInfo.nickname,
      });
      setText("");
    }
  }

  function taSubmit(e) {
    if (e.ctrlKey && e.keyCode === 13) {
      submitHandler();
    }
  }

  return (
    <div className="newMessage">
      <Textarea
        className="newMessage__area"
        placeholder="New message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={taSubmit}
      ></Textarea>
      <div
        className={clsx("newMessage__btn", !Boolean(text.length) && "disabled")}
        onClick={submitHandler}
      >
        <SendMsgIcon />
      </div>
    </div>
  );
}

export default CreateNewMessage;
