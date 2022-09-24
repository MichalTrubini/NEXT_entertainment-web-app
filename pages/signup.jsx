import LoginTemplate from "../src/shared/components/login/loginTemplate";
import { useRef, useState } from "react";
import Portal from '../src/shared/portal/portal';
import Success from "../src/shared/components/login/success";

async function createUser(email, password) {
  const response = await fetch("/api/auth/auth", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

const Signup = () => {
  const emailInputRef = useRef();
  const emailPasswordRef = useRef();
  const emailPasswordRepeatedRef = useRef();

  const [emptyEmail, setEmptyEmail] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);
  const [emptyPasswordRepeated, setEmptyPasswordRepeated] = useState(false);
  const [incorrectPassword, setIncorrectPassword] = useState(false);
  const [wrongFormatEmail, setWrongFormatEmail] = useState(false);
  const [wrongCredentials, setWrongCredentials] = useState(false);
  const [userExists, setUserExists] = useState(false);
  const [signUpSuccess, setSignupSuccess] = useState(false);

  async function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = emailPasswordRef.current.value;
    const enteredPasswordRepeated = emailPasswordRepeatedRef.current.value;

    const regex =
      /^[\w]{1,}[\w.+-]{0,}@[\w-]{2,}([.][a-zA-Z]{2,}|[.][\w-]{2,}[.][a-zA-Z]{2,})$/;

    if (enteredEmail.length === 0) {
      setEmptyEmail(true);
    } else if (!regex.test(enteredEmail)) {
      return setWrongFormatEmail(true);
    }

    if (enteredPassword.length === 0) {
      setEmptyPassword(true);
    }
    if (enteredPasswordRepeated.length === 0) {
      return setEmptyPasswordRepeated(true);
    }

    if (enteredPassword !== enteredPasswordRepeated) {
      return setIncorrectPassword(true);
    }

    try {
      const result = await createUser(enteredEmail, enteredPassword);

      setSignupSuccess(true);

      setTimeout(function () {
        window.location.replace("/login");

      }, 2000);

    } catch (error) {
      if (error) setUserExists(true);
    }
  }

  const clearInputHandler = () => {
    setEmptyEmail(false);
    setEmptyPassword(false);
    setEmptyPasswordRepeated(false);
    setWrongFormatEmail(false);
    setWrongCredentials(false);
    setIncorrectPassword(false);
  };

  return (
    <>
      <Portal selector={"#Portal"}>{signUpSuccess && <Success />}</Portal>
      <LoginTemplate
        title="Sign Up"
        buttonText="Create an account"
        message="Already have an account?"
        link="/login"
        action="Login"
        onSubmit={submitHandler}
        refEmail={emailInputRef}
        refPassword={emailPasswordRef}
        refPasswordRepeated={emailPasswordRepeatedRef}
        emptyEmail={emptyEmail}
        wrongFormatEmail={wrongFormatEmail}
        emptyPassword={emptyPassword}
        emptyPasswordRepeated={emptyPasswordRepeated}
        incorrectPassword={incorrectPassword}
        wrongCredentials={wrongCredentials}
        userExists={userExists}
        onClick={clearInputHandler}
      />
    </>
  );
};

export default Signup;
