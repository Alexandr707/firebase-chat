import { clsx } from "clsx";
import { useEffect } from "react";
import { useKeyPress } from "../../hooks/useKeyPres";
import st from "./DropDown.module.scss";

function DropDown({ children, isOpen, close }) {
  const keys = useKeyPress([27], true);

  useEffect(() => {
    isOpen && keys[0] === 27 && close();
  }, [keys]);

  return <div className={clsx(st.wrapp, isOpen && st.open)}>{children}</div>;
}

export default DropDown;
