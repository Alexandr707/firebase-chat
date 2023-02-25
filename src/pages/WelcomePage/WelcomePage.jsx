import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import Button from "../../component/Button/Button";
import Loader from "../../component/Loader/Loader";
import vars from "../../Constants/vars";
import "./WelcomePage.scss";

function WelcomePage() {
  const { status, userInfo } = useSelector((state) => state.user);
  const navigate = useNavigate();

  if (userInfo) return <Navigate to={"/"} />;

  function redirrectToLogin() {
    navigate("/login");
  }

  function redirrectToSignIn() {
    navigate("/signin");
  }

  return (
    <div className="welcome">
      <div className="welcome__wrapp">
        {status === vars.LOADING && <Loader />}
        {status === vars.UNAUTHORIZED && (
          <>
            <div className="welcome__buttons">
              <Button className="welcome__btn" onClick={redirrectToSignIn}>
                Sign in
              </Button>
              <Button className="welcome__btn" onClick={redirrectToLogin}>
                Login
              </Button>
            </div>
            <div className="welcome__about">
              <h3>Возможности чата:</h3>
              <ul>
                <li>Владелец чата может назначить модереаторов.</li>
                <li>Можно кастомизировать цветовую палитру чата.</li>
              </ul>
              <p>Чат использует firebase как хранилище.</p>
              <p>
                Стек: <b>React</b> <b>Redux</b> <b>Scss</b>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default WelcomePage;
