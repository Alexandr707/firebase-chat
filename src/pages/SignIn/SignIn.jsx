import { useEffect, useState } from "react";
import { clsx } from "clsx";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../../component/Button/Button";
import Input from "../../component/Input/Input";
import { User } from "../../firebase";
import { useKeyPress } from "../../hooks/useKeyPres";
import { getColorSchema } from "../../utils/getColorSchema";
import "./SignIn.scss";

function SignIn() {
  const navigate = useNavigate();
  const [signInError, setSignInError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [enter] = useKeyPress([13], true);

  useEffect(() => {
    enter && handleSubmit(submit);
  }, [enter]);

  function submit(data) {
    const { email, pass, ...userInfo } = data;
    userInfo.preferences = getColorSchema();
    User.signin({ email, pass, userInfo })
      .then(() => navigate("/"))
      .catch((err) => {
        setSignInError("Something broke");
        console.error(err);
      });
  }

  return (
    <div className="signin">
      <div className="signin__wrapp">
        {Boolean(signInError.length) && <h2>{signInError}</h2>}
        <Input
          className={clsx("signin__userName", errors.nickname && "error")}
          type="text"
          placeholder="nickname"
          {...register("nickname", {
            required: true,
            minLength: {
              value: 3,
              message: "nickname length must be more then 3 characters",
            },
          })}
        />
        {errors.nickname && <p>{errors.nickname.message}</p>}
        <Input
          className={clsx("signin__email", errors.email && "error")}
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
          className={clsx("signin__pass", errors.pass && "error")}
          type="password"
          placeholder="password"
          {...register("pass", {
            required: {
              value: true,
              message: "Please enter password",
            },
            minLength: {
              value: 6,
              message: "Password length must be more than 6 characters",
            },
          })}
        />
        {errors.pass && <p>{errors.pass.message}</p>}
        <Button className="signin__signBtn" onClick={handleSubmit(submit)}>
          Sign In
        </Button>
        <Button onClick={() => navigate("/welcome")}>Back</Button>
      </div>
    </div>
  );
}

export default SignIn;
