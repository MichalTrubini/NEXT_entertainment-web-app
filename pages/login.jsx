import LoginTemplate from "../src/shared/components/login/loginTemplate";
import { signIn } from "next-auth/client";
import { useRef } from "react";

const Login = () => {
  const emailInputRef = useRef();
  const emailPasswordRef = useRef();

  async function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = emailPasswordRef.current.value;

    const result = await signIn("credentials", {
      redirect: false,
      email: enteredEmail,
      password: enteredPassword,
    });
    console.log(result);

    if (result.error === null) {window.location.href = "/"}
    
  }

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
    />
  );
};

export default Login;
