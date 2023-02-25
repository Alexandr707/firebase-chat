import { useRef } from "react";
import "./Textarea.scss";

function Textarea({ children, ...props }) {
  const ta = useRef(null);

  // function changeHandler(e) {
  //   if (ta.current) {
  //     const el = ta.current;
  //     el.style.cssText = "height:auto; ";
  //     el.style.cssText = "height:" + el.scrollHeight + "px";
  //     if (props.onKeyDown) {
  //       props.onKeyDown(e);
  //     }
  //   }
  // }

  return (
    <textarea ref={ta} {...props}>
      {children}
    </textarea>
  );
}

export default Textarea;
