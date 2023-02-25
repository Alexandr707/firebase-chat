import { forwardRef } from "react";
import "./Button.scss";

const Button = forwardRef(({ children, ...props }, ref) => {
  return (
    <button ref={ref} {...props}>
      {children}
    </button>
  );
});

export default Button;
