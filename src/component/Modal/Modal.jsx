import { useEffect } from "react";
import { useKeyPress } from "../../hooks/useKeyPres";
import Button from "../Button/Button";
import { CloseIcon } from "../Icons";
import st from "./Modal.module.scss";

function Modal({
  children,
  isVisible,
  label,
  close = new Function(),
  submit = new Function(),
  ...props
}) {
  const [enter, esc] = useKeyPress([13, 27], true);
  const isDisabled = props.disabled === "undefined" ? false : props.disabled;

  useEffect(() => {
    if (isVisible) {
      if (enter) {
        submit();
      } else if (esc) {
        close();
      }
    }
  }, [enter, esc]);

  if (!isVisible) return null;

  return (
    <div className={st.modal}>
      <div className={st.bacplate} onMouseDown={() => close()}></div>
      <div className={st.wrapp}>
        <div className={st.close} onMouseDown={() => close()}>
          <CloseIcon />
        </div>
        {children}
        <div className={st.btn}>
          <Button onClick={() => submit()} disabled={isDisabled}>
            {label || "Submit"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
