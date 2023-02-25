import { clsx } from "clsx";
import "./MenuIcon.scss";

function MenuIcon({ open, className, ...props }) {
  return (
    <div {...props} className={clsx("menuIcon", className, open && "open")}>
      <span className="menuIcon__span"></span>
      <span className="menuIcon__span"></span>
      <span className="menuIcon__span"></span>
    </div>
  );
}

export default MenuIcon;
