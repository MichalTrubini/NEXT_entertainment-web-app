import LoginTemplate from "../src/shared/components/login/loginTemplate";
import { signIn } from "next-auth/client";
import { useRef, useState } from "react";

const Login = () => {
  const emailInputRef = useRef();
  const emailPasswordRef = useRef();

  const [emptyEmailError, setEmptyEmailError] = useState(false);
  const [emptyPasswordError, setEmptyPasswordError] = useState(false);
  const [wrongFormatEmail, setWrongFormatEmail] = useState(false);
  const [wrongCredentials, setWrongCredentials] = useState(false);

  async function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = emailPasswordRef.current.value;

    const regex =
      /^[\w]{1,}[\w.+-]{0,}@[\w-]{2,}([.][a-zA-Z]{2,}|[.][\w-]{2,}[.][a-zA-Z]{2,})$/;

    if (enteredEmail.length === 0) {
      setEmptyEmailError(true);
    } else if (!regex.test(enteredEmail)) {return setWrongFormatEmail(true)};

    if (enteredPassword.length === 0) {
      return setEmptyPasswordError(true);
    }

    const result = await signIn("credentials", {
      redirect: false,
      email: enteredEmail,
      password: enteredPassword,
    });

    if (result.error !== null) {
      return setWrongCredentials(true);
    }

    console.log(result);

    if (result.error === null) {
      window.location.href = "/";
    }
  }

  const clearInputHandler = () => {
    setEmptyEmailError(false);
    setEmptyPasswordError(false);
    setWrongFormatEmail(false);
    setWrongCredentials(false)
  };

  return (
    <LoginTemplate
      title="Login"
      buttonText="Login to your account"
      message="Don't have an account?"
      link="/signup"
      action="Sign up"
      refEmail={emailInputRef}
      refPassword={emailPasswordRef}
      onSubmit={submitHandler}
      emptyEmail={emptyEmailError}
      wrongFormatEmail={wrongFormatEmail}
      emptyPassword={emptyPasswordError}
      wrongCredentials={wrongCredentials}
      onClick={clearInputHandler}
    />
  );
};

export default Login;
