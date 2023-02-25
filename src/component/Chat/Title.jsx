import clsx from "clsx";
import { useState } from "react";
import { useSelector } from "react-redux";
import IsModerator from "../../hoc/IsModerator";
import { GearIcon } from "../Icons";
import SettingsComp from "../SettingsComp/SettingsComp";

function Title() {
  const [isOptions, setIsOptions] = useState(false);
  const { userId, currentChat } = useSelector((state) => ({
    currentChat: state.chats.currentChat,
    userId: state.user.userId,
  }));

  return (
    <>
      <div className="main__chat-title">
        {!Boolean(currentChat) && (
          <h2 className="messages__empty">Chat is not selected</h2>
        )}
        {Boolean(currentChat) && (
          <>
            <h2>{currentChat.name}</h2>
            <IsModerator uid={userId}>
              <span className="moderator">(Moderator)</span>
            </IsModerator>
          </>
        )}
        <div
          className={clsx("message__gear", isOptions && "clicked")}
          onClick={() => setIsOptions(!isOptions)}
        >
          <GearIcon />
        </div>
      </div>
      {isOptions && (
        <SettingsComp
          isOpen={isOptions}
          close={() => setIsOptions(!isOptions)}
        />
      )}
    </>
  );
}

export default Title;
