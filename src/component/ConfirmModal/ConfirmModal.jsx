import { useEffect, useRef } from "react";
import { useKeyPress } from "../../hooks/useKeyPres";
import Button from "../Button/Button";
import { CloseIcon } from "../Icons";
import st from "./ConfirmModal.module.scss";

function ConfirmModal({ children, isVisible, submit, label, close }) {
  const btn = useRef(null);

  const [enter, esc] = useKeyPress([13, 27], true);

  useEffect(() => {
    if (isVisible) {
      if (enter) {
        //enter
        submit && submit();
      }
      if (esc) {
        //esc
        close && close();
      }
    }
  }, [enter, esc]);

  useEffect(() => {
    if (btn.current) {
      btn.current.focus();
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className={st.confirm}>
      <div className={st.backplate} onClick={close}></div>
      <div className={st.wrapp}>
        <div className={st.close} onClick={close}>
          <CloseIcon />
        </div>
        {children}
        <Button ref={btn} className={st.btn} onClick={submit}>
          {label || "Submit"}
        </Button>
      </div>
    </div>
  );
}

export default ConfirmModal;
