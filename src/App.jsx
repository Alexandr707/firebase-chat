import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import store from "./redux/store";
import { User, init } from "./firebase";

import MainPage from "./pages/MainPage/MainPage";
import AuthRequired from "./hoc/AuthRequired";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import Login from "./pages/Login/Login";
import SignIn from "./pages/SignIn/SignIn";
import "./App.scss";
import { setColorSchema } from "./utils/setColorSchema";
import { getColorSchema } from "./utils/getColorSchema";

function App() {
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--vh",
      window.innerHeight * 0.01 + "px"
    );
    window.addEventListener("resize", () => {
      document.documentElement.style.setProperty(
        "--vh",
        window.innerHeight * 0.01 + "px"
      );
    });
  }, []);

  useEffect(() => {
    setColorSchema(getColorSchema(), false);
    document.addEventListener(
      "storage",
      () => {
        setColorSchema(getColorSchema(), false);
      },
      []
    );

    User.onChange((user) => {
      if (user) {
        init();
      } else console.log("no curent user");
    });
  }, []);

  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route
            path="/"
            element={
              <AuthRequired>
                <MainPage />
              </AuthRequired>
            }
          />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="*" element={<Navigate to={"/welcome"} />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
