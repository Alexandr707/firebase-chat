import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function AuthRequired({ children }) {
  const userId = useSelector((state) => state.user.userId);

  if (userId) {
    return children;
  } else {
    return <Navigate to={"/welcome"} />;
  }
}

export default AuthRequired;
