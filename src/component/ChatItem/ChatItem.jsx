import { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { chats } from "../../firebase";
import IsChatOwner from "../../hoc/IsChatOwner";
import { setCurrentChat } from "../../redux/store";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import { DeleteIcon, EditIcon } from "../Icons";
import NewChatModal from "../NewChatModal/NewChatModal";
import "./ChatItem.scss";

function ChatItem({ chatData }) {
  const { name, cid } = chatData;
  const dispatch = useDispatch();
  const currentChat = useSelector((state) => state.chats.currentChat);
  const isSelected = currentChat ? currentChat.cid === cid : false;
  const [isConfirm, setIsConfirm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  function editChat(data) {
    chats.updateChatData(chatData.cid, data);
    setIsEdit(false);
  }

  return (
    <>
      <div
        className={`chatItem ${isSelected ? "selected" : ""}`}
        onClick={() => dispatch(setCurrentChat(chatData))}
        title={name}
      >
        {name}
        <IsChatOwner chat={chatData}>
          <div className="chatItem__btns">
            <div
              className="chatItem__edite"
              onClick={(e) => {
                e.stopPropagation();
                setIsEdit(true);
              }}
            >
              <EditIcon />
            </div>
            <div
              className="chatItem__remove"
              onClick={(e) => {
                e.stopPropagation();
                setIsConfirm(true);
              }}
            >
              <DeleteIcon />
            </div>
          </div>
        </IsChatOwner>
      </div>
      {isConfirm && (
        <ConfirmModal
          label="Yes"
          isVisible={isConfirm}
          close={() => setIsConfirm(false)}
          submit={() => {
            chats.deleteChat(chatData.cid);
            dispatch(setCurrentChat(null));
            setIsConfirm(false);
          }}
        >
          <p>Delete chat {chatData.name}?</p>
        </ConfirmModal>
      )}
      {isEdit && (
        <NewChatModal
          isVisible={isEdit}
          editeData={chatData}
          onClose={() => setIsEdit(false)}
          onSubmite={editChat}
        />
      )}
    </>
  );
}

export default memo(ChatItem);
