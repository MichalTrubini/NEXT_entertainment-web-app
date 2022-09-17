import styles from "./loginTemplate.module.css";
import logo from "../../../../public/assets/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

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
      <form className={styles.form} onSubmit={props.onSubmit}>
        <h1 className={styles.title}>{props.title}</h1>
        <input
          className={styles.input}
          type="email"
          placeholder="Email address"
          ref={props.refEmail}
          required
        />
        <input
          className={styles.input}
          type="password"
          placeholder="Password"
          ref={props.refPassword}
          required
        />
        {router.asPath === "/signup" && (
          <input
            className={styles.input}
            type="password"
            placeholder="Repeat password"
            required
          />
        )}

        <button type="submit" className={styles.button}>
          {props.buttonText}
        </button>
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
