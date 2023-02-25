import { clsx } from "clsx";
import { forwardRef } from "react";
import st from "./Input.module.scss";

const Input = forwardRef((props, ref) => {
  return (
    <input ref={ref} {...props} className={clsx(st.input, props.className)} />
  );
});

export default Input;
