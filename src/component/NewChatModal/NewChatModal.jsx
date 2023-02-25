import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useKeyPress } from "../../hooks/useKeyPres";
import Button from "../Button/Button";
import Input from "../Input/Input";
import SelectComponent from "../SelectModers/SelectModers";
import "./NewChatModal.scss";

function NewChatModal({
  isVisible = true,
  onClose = new Function(),
  onSubmite = new Function(),
  editeData = {},
}) {
  const [chatName, setChatName] = useState("");
  const [moders, setModers] = useState({});
  const [owner, setOwner] = useState("");
  const userId = useSelector((state) => state.user.userId);
  const inputRef = useRef(null);
  const [enter, esc] = useKeyPress([13, 27], true);

  useEffect(() => {
    if (isVisible) {
      if (enter && chatName.length) {
        submitHandler();
      } else if (esc) {
        close();
      } else {
        inputRef.current && inputRef.current.focus();
      }
    }
  }, [enter, esc]);

  useEffect(() => {
    const { owner, name, moderators } = editeData;
    if (owner && name) {
      setChatName(name);
      setModers(moderators || {});
      setOwner(owner);
    }
    inputRef.current && inputRef.current.focus();
  }, []);

  function close() {
    setChatName("");
    onClose();
  }

  function submitHandler() {
    console.log("new data", {
      name: chatName,
      moderators: moders,
      owner: Boolean(owner) ? owner : userId,
    });
    onSubmite({
      name: chatName,
      moderators: moders,
      owner: Boolean(owner) ? owner : userId,
    });
    setChatName("");
  }

  function salectHandler(sel) {
    let newModersObj = {};

    if (Array.isArray(sel) && sel.length) {
      sel.map(({ value }) => value).forEach((v) => (newModersObj[v] = v));
      console.log("[new moders]", newModersObj);
    }
    setModers(newModersObj);
  }

  if (!isVisible) {
    return null;
  }

  return (
    <div className="chatModal">
      <div className="chatModall__backplate" />
      <div className="chatModal__wrapp">
        <div className="chatModal__close" onClick={close}>
          X
        </div>
        <div className="chatmodal__input">
          <label htmlFor="chat name">Name: </label>
          <Input
            ref={inputRef}
            id="chat name"
            type="text"
            placeholder="Chat name"
            value={chatName}
            onChange={(e) => setChatName(e.target.value)}
          />
        </div>
        <SelectComponent
          className="chatmodal__select"
          placeholder="Moderators"
          selected={salectHandler}
          chat={editeData}
        />
        <Button
          className="chatModal__submite"
          onClick={submitHandler}
          disabled={!Boolean(chatName.length)}
        >
          Submite
        </Button>
      </div>
    </div>
  );
}

export default NewChatModal;
