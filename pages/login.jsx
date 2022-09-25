import LoginTemplate from "../src/shared/components/login/loginTemplate";
import { useRouter } from "next/router";
import { signIn, getSession, useSession } from "next-auth/react";
import { useRef, useState, useEffect } from "react";
import Router from "next/router";
import Head from "next/head";

const Login = () => {
  const emailInputRef = useRef();
  const emailPasswordRef = useRef();

  const router = useRouter();

  const [emptyEmailError, setEmptyEmailError] = useState(false);
  const [emptyPasswordError, setEmptyPasswordError] = useState(false);
  const [wrongFormatEmail, setWrongFormatEmail] = useState(false);
  const [wrongCredentials, setWrongCredentials] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Router.events.on("routeChangeStart", () => setLoading(true));
    Router.events.on("routeChangeComplete", () => setLoading(false));
    Router.events.on("routeChangeError", () => setLoading(false));
    return () => {
      Router.events.off("routeChangeStart", () => setLoading(true));
      Router.events.off("routeChangeComplete", () => setLoading(false));
      Router.events.off("routeChangeError", () => setLoading(false));
    };
  }, [Router.events]);

  const { data: session, status } = useSession();

  getSession().then((session) => {
    if (session) {
      router.replace("/");
    }
  });

  async function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = emailPasswordRef.current.value;

    const regex =
      /^[\w]{1,}[\w.+-]{0,}@[\w-]{2,}([.][a-zA-Z]{2,}|[.][\w-]{2,}[.][a-zA-Z]{2,})$/;

    if (enteredEmail.trim().length === 0) {
      setEmptyEmailError(true);
    } else if (!regex.test(enteredEmail)) {
      return setWrongFormatEmail(true);
    }

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

    if (result.error === null) {
      router.replace("/");
    }
  }

  const clearInputHandler = () => {
    setEmptyEmailError(false);
    setEmptyPasswordError(false);
    setWrongFormatEmail(false);
    setWrongCredentials(false);
  };

  return (
    <>
      <Head>
        <title>Entertainment app</title>
        <meta name="description" content="Entertainment app login page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {status === "loading" && <div></div>}
      {!session && (
        <div className={loading ? "overlay" : ""}>
          {loading && (
            <div className="dotWindmillContainer">
              <div className="dotWindmill"></div>
            </div>
          )}
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
        </div>
      )}
    </>
  );
};

export default Login;
