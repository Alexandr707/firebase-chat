import { useState } from "react";
import { useSelector } from "react-redux";
import { chats as fbChats } from "../../firebase";
import NewChatModal from "../NewChatModal/NewChatModal";
import ChatItem from "../ChatItem/ChatItem";
import "./ChatsList.scss";

function ChatsList() {
  const chats = useSelector((state) => state.chats.list);
  const [isModal, setIsModal] = useState(false);

  function submiteModal(data) {
    fbChats.createChat(data);
    setIsModal(false);
  }

  return (
    <div className="chats">
      <div className="chats__wrapp">
        <h2 className="chats__title">Chats</h2>
        <div className="chats__list">
          {chats.map((c) => (
            <ChatItem key={c.cid} chatData={c} />
          ))}
        </div>
        <div className="chats__addNewChat">
          <button
            className="chats__newChatBtn btn"
            onClick={() => setIsModal(true)}
            disabled={isModal}
          >
            New chat
          </button>
          {isModal && (
            <NewChatModal
              isVisible={isModal}
              onClose={() => setIsModal(false)}
              onSubmite={submiteModal}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatsList;
