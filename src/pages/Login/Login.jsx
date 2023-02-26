import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { User } from "../../firebase";
import Button from "../../component/Button/Button";
import Input from "../../component/Input/Input";
import { useNavigate } from "react-router-dom";
import { useKeyPress } from "../../hooks/useKeyPres";
import "./Login.scss";
import { setColorSchema } from "../../utils/setColorSchema";

function Login() {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [enter] = useKeyPress([13], true);

  useEffect(() => {
    handleSubmit(submit);
  }, [enter]);

  function submit(data) {
    User.login(data)
      .then(() => navigate("/"))
      .catch(() => {
        setLoginError("Please check your Email or password");
      })
      .then(({ userInfo }) => {
        console.log(userInfo);
        setColorSchema(userInfo);
      });
  }

  return (
    <div className="login">
      <div className="login__wrapp">
        {Boolean(loginError.length) && <h2>{loginError}</h2>}
        <Input
          className={`login__email  ${errors.email ? "error" : ""}`}
          type="email"
          placeholder="email"
          {...register("email", {
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "Email is not correct",
            },
            required: {
              value: true,
              message: "Please enter email",
            },
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}
        <Input
          className={`login__pass ${errors.pass ? "error" : ""}`}
          type="password"
          placeholder="password"
          {...register("pass", {
            required: {
              value: true,
              message: "Please enter password",
            },
            minLength: {
              value: 6,
              message: "Password length must be more then 6 characters",
            },
          })}
        />
        {errors.pass && <p>{errors.pass.message}</p>}
        <Button className="login__submit" onClick={handleSubmit(submit)}>
          Submit
        </Button>
        <Button onClick={() => navigate("/welcome")}>Back</Button>
      </div>
    </div>
  );
}

export default Login;
