//import { json } from "stream/consumers";
import LoginTemplate from "../src/shared/components/login/loginTemplate";
import { useRef } from "react";

async function createUser(email, password) {
  const response = await fetch('/api/auth/auth', {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json"
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

  async function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = emailPasswordRef.current.value;
    console.log(enteredEmail, enteredPassword)
    try {
      const result = await createUser(enteredEmail, enteredPassword);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <LoginTemplate
      title="Sign Up"
      buttonText="Create an account"
      message="Already have an account?"
      link="/login"
      action="Login"
      onSubmit={submitHandler}
      refEmail={emailInputRef}
      refPassword={emailPasswordRef}
    />
  );
};

export default Signup;
