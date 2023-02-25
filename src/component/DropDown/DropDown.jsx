import { clsx } from "clsx";
import { useEffect } from "react";
import { useKeyPress } from "../../hooks/useKeyPres";
import st from "./DropDown.module.scss";

function DropDown({ children, isOpen, close }) {
  const [esc] = useKeyPress([27], true);

  useEffect(() => {
    esc && close();
  }, [esc]);

  return <div className={clsx(st.wrapp, isOpen && st.open)}>{children}</div>;
}

export default DropDown;
