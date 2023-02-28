import NewChatModal from "../NewChatModal/NewChatModal";
import { setCurrentChat } from "../../redux/store";
import { chats as fbChats } from "../../firebase";
import ChatItem from "../ChatItem/ChatItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "./ChatsList.scss";

function ChatsList() {
  const { list: chats, currentChat } = useSelector((state) => state.chats);
  const dispatch = useDispatch();
  const [isModal, setIsModal] = useState(false);

  useEffect(() => {
    if (
      chats &&
      currentChat &&
      !chats.filter((c) => c.cid === currentChat.cid).length
    ) {
      dispatch(setCurrentChat(null));
    }
  }, [chats]);

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
