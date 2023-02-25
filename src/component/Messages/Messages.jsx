import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { message } from "../../firebase";
import { setMessages } from "../../redux/store";
import Message from "./Message";
import "./Messages.scss";

function Messages() {
  const dispatch = useDispatch();
  const currentChat = useSelector((state) => state.chats.currentChat);
  const messages = useSelector((state) => state.messages.list);
  const wrappRef = useRef(null);

  useEffect(() => {
    if (wrappRef.current) {
      wrappRef.current.scrollTop = wrappRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (!currentChat) {
      dispatch(setMessages([]));
    }
    if (currentChat) {
      message.subscribeOnChatMessages(currentChat.cid);
    }
  }, [currentChat]);

  return (
    <div className="messages">
      <div ref={wrappRef} className="messages__wrapp">
        {Boolean(currentChat) && !Boolean(messages.length) && (
          <div className="messages__empty">No messages in this chat</div>
        )}
        {Boolean(messages.length) &&
          messages.map((m) => <Message key={m.mid} msg={m} />)}
      </div>
    </div>
  );
}

export default Messages;
