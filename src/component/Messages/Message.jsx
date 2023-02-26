import { clsx } from "clsx";
import { memo, useState } from "react";
import { useSelector } from "react-redux";
import { message } from "../../firebase";
import CanEditMsg from "../../hoc/CanEditMsg";
import IsModerator from "../../hoc/IsModerator";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import EditMessage from "../EditMessage/EditMessage";
import { DeleteIcon, DotsIcon, EditIcon } from "../Icons";

function Message({ msg }) {
  const { text, nickname, timestamp, uid, editorNickname } = msg;
  const userId = useSelector((state) => state.user.userId);
  const time = new Date(timestamp).toLocaleString();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  function deleteMessage() {
    if (isModalVisible) {
      setIsModalVisible(false);
      message.deleteMessage(msg);
    }
  }

  return (
    <div className="message">
      <div
        className={clsx("message__content", userId === uid && "currentUser")}
      >
        <div className="message__text">
          {text}
          {editorNickname && <span>(edited by {editorNickname})</span>}
        </div>
        <div className="message__user">
          {nickname}
          <IsModerator uid={msg.uid}>
            <span className="moderator">(Moderator)</span>
          </IsModerator>
        </div>
        <div className="message__time">{time}</div>
        <CanEditMsg msg={msg}>
          <div className="message__icons">
            <div
              className="message__dots msgEditIcon"
              onClick={() => setEditOpen(true)}
            >
              <DotsIcon />
            </div>
            {editOpen && (
              <div className="message__editBtns">
                <div
                  className="message__delete msgEditIcon"
                  onClick={() => {
                    setEditOpen(false);
                    setIsModalVisible(true);
                  }}
                >
                  <DeleteIcon />
                </div>
                <div
                  className="message__edit msgEditIcon"
                  onClick={() => {
                    setEditOpen(false);
                    setIsUpdate(true);
                  }}
                >
                  <EditIcon />
                </div>
              </div>
            )}
          </div>
        </CanEditMsg>
        {isModalVisible && (
          <ConfirmModal
            isVisible={isModalVisible}
            label={"Yes"}
            close={() => {
              setIsModalVisible(false);
            }}
            submit={deleteMessage}
          >
            <p>{`Remove message?`}</p>
          </ConfirmModal>
        )}

        {isUpdate && (
          <EditMessage
            msg={msg}
            isVisible={isUpdate}
            toggle={() => setIsUpdate(!isUpdate)}
          />
        )}
      </div>
    </div>
  );
}

export default memo(Message);
