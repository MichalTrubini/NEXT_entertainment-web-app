import styles from "./header.module.css";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/client";

import logo from "../../../../public/assets/logo.svg";
import homeIcon from "../../../../public/assets/icon-nav-home.svg";
import moviesIcon from "../../../../public/assets/icon-nav-movies.svg";
import TVseriesIcon from "../../../../public/assets/icon-nav-tv-series.svg";
import bookmarkIcon from "../../../../public/assets/icon-nav-bookmark.svg";
import userIcon from "../../../../public/assets/image-avatar.png";

const Header = () => {
  const [session, loading] = useSession();

  function logoutHandler() {
    signOut();
  }

  console.log(session)

  return (
    <div className={styles.headerWrapper}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Link href="/">
            <a>
              <Image src={logo} alt="Entertainment app" />
            </a>
          </Link>
        </div>
        <ul className={styles.list}>
          <Link href="/">
            <li className={styles.listItem}>
              <Image src={homeIcon} alt="home" />
            </li>
          </Link>
          <Link href="/movies">
            <li className={styles.listItem}>
              <Image src={moviesIcon} alt="home" />
            </li>
          </Link>
          <Link href="/tv-series">
            <li className={styles.listItem}>
              <Image src={TVseriesIcon} alt="home" />
            </li>
          </Link>
          <Link href="/bookmarked">
            <li className={styles.listItem}>
              <Image src={bookmarkIcon} alt="home" />
            </li>
          </Link>
        </ul>
        <div className={styles.avatar}>
          <div className={styles.avatarContainer}>
            {session && <Image src={userIcon} alt="user" />}
            {!session && !loading && <p className={styles.userLogout}>?</p>}
          </div>
          {session && (
            <p className={styles.login} onClick={logoutHandler}>
              Logout
            </p>
          )}
          {!session && !loading && (
            <Link href="login">
              <p className={styles.login}>Log in</p>
            </Link>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
