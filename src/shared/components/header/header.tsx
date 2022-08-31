import styles from "./header.module.css";
import Image from "next/image";
import Link from "next/link";

import logo from "../../../../public/assets/logo.svg";
import homeIcon from "../../../../public/assets/icon-nav-home.svg";
import moviesIcon from "../../../../public/assets/icon-nav-movies.svg";
import TVseriesIcon from "../../../../public/assets/icon-nav-tv-series.svg";
import bookmarkIcon from "../../../../public/assets/icon-nav-bookmark.svg";
import userIcon from "../../../../public/assets/image-avatar.png";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Image src={logo} alt="Entertainment app" />
      </div>
      <ul className={styles.list}>
        <Link href="/">
          <li className={styles.listItem}>
            <Image src={homeIcon} alt="home" />
          </li>
        </Link>
        <Link href="/">
          <li className={styles.listItem}>
            <Image src={moviesIcon} alt="home" />
          </li>
        </Link>
        <Link href="/">
          <li className={styles.listItem}>
            <Image src={TVseriesIcon} alt="home" />
          </li>
        </Link>
        <Link href="/">
          <li className={styles.listItem}>
            <Image src={bookmarkIcon} alt="home" />
          </li>
        </Link>
      </ul>
      <div className={styles.avatar}>
        <Image src={userIcon} alt="user" />
      </div>
    </header>
  );
};

export default Header;
