import { useState } from "react";
import { useSelector } from "react-redux";
import { message } from "../../firebase";
import Modal from "../Modal/Modal";
import Textarea from "../Textarea/Textarea";

function EditMessage({ msg, isVisible, toggle }) {
  const [text, setText] = useState((msg && msg.text) || "");
  const user = useSelector((state) => state.user);

  function submitHandler() {
    if (text.length) {
      message.updateMessage({ ...msg, text }, user);
      toggle();
    }
  }

  function closeHandler() {
    toggle();
  }

  return (
    <Modal
      isVisible={isVisible}
      submit={submitHandler}
      close={closeHandler}
      disabled={!text.length}
    >
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ minWidth: "300px", minHeight: "240px" }}
      />
    </Modal>
  );
}

export default EditMessage;
