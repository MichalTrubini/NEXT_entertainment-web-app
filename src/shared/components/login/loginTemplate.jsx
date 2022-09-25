import styles from "./loginTemplate.module.css";
import logo from "../../../../public/assets/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import close from "../../../../public/assets/icon-close.svg";

const LoginTemplate = (props) => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <Link href="/">
          <a>
            <Image src={logo} alt="entertainment app" />
          </a>
        </Link>
      </div>
      <form className={styles.form} onSubmit={props.onSubmit} noValidate>
        <div className={styles.close}>
          <Link href='/'><a><Image src={close} alt="close form"/></a></Link>
        </div>
        <h1 className={styles.title}>{props.title}</h1>
        <div className={styles.inputContainer}>
          <input
            className={
              props.emptyEmail ||
              props.wrongFormatEmail ||
              props.wrongCredentials
                ? `${styles.input} ${styles.inputErrorClassname}`
                : styles.input
            }
            type="email"
            placeholder="Email address"
            ref={props.refEmail}
            onClick={props.onClick}
            required
          />
          {props.wrongFormatEmail && (
            <p className={styles.warning}>Incorrect email format</p>
          )}
          {props.emptyEmail && (
            <p className={styles.warning}>Can&apos;t be empty</p>
          )}
        </div>
        <div className={styles.inputContainer}>
          <input
            className={
              props.emptyPassword ||
              props.emptyPasswordRepeated ||
              props.shortPassword ||
              props.shortRepeatedPassword ||
              props.incorrectPassword ||
              props.wrongCredentials
                ? `${styles.input} ${styles.inputErrorClassname}`
                : styles.input
            }
            type="password"
            placeholder="Password"
            ref={props.refPassword}
            onClick={props.onClick}
            required
          />
          {props.emptyPassword && (
            <p className={styles.warning}>Can&apos;t be empty</p>
          )}
          {props.shortPassword && (
            <p className={styles.warning}>Must be at least 7 characters</p>
          )}
        </div>

        {router.asPath === "/signup" && (
          <div className={styles.inputContainer}>
            <input
              className={
                props.emptyPassword ||
                props.emptyPasswordRepeated ||
                props.shortPassword ||
                props.shortRepeatedPassword ||
                props.incorrectPassword ||
                props.wrongCredentials
                  ? `${styles.input} ${styles.inputErrorClassname}`
                  : styles.input
              }
              type="password"
              placeholder="Repeat password"
              ref={props.refPasswordRepeated}
              onClick={props.onClick}
              required
            />
            {props.emptyPasswordRepeated && (
              <p className={styles.warning}>Can&apos;t be empty</p>
            )}
            {props.shortRepeatedPassword && (
              <p className={styles.warning}>Must be at least 7 characters</p>
            )}
            {props.incorrectPassword && (
              <p className={styles.warning}>Passwords are not equal</p>
            )}
          </div>
        )}

        <div className={styles.inputContainer}>
          {props.wrongCredentials && (
            <p className={styles.warningCredentials}>
              Incorrect email or password
            </p>
          )}
          {props.userExists && (
            <p className={styles.warningCredentials}>
              Such an email already exists!
            </p>
          )}
          <button type="submit" className={styles.button}>
            {props.buttonText}
          </button>
        </div>

        <div className={styles.row}>
          <p className={styles.message}>{props.message}</p>
          <Link href={props.link}>
            <p className={styles.action}>{props.action}</p>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginTemplate;
