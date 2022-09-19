import Image from "next/image";
import styles from "./videoItem.module.css";
import bookmarkOff from "../../../public/assets/icon-bookmark-empty.svg";
import bookmarkOn from "../../../public/assets/icon-bookmark-full.svg";
import playIcon from "../../../public/assets/icon-play.svg";
import { useState } from "react";
import { useSession } from "next-auth/client";

async function addBookmarkToDb(bookmarkID, userEmail) {
  const response = await fetch('/api/bookmarkHandler', {
    method: "POST",
    body: JSON.stringify({ bookmarkID, userEmail }),
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

const VideoItem = (props) => {
  const [isShown, setIsShown] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [session, loading] = useSession();

  function bookmarkHandler(event) {
    if (!session) {
      return console.log("problem");
    } else {
      const bookmarkId = event.target.getAttribute("dataid")
      const userEmail = session.user.email

      addBookmarkToDb(bookmarkId, userEmail);
      setBookmarked((prevState) => !prevState);
    }
  }

  return (
    <div className={styles.video}>
      <div className={styles.bookmarkContainer}>
        <Image
          src={bookmarked === false ? bookmarkOff : bookmarkOn}
          className={styles.bookmarkHover}
          onClick={bookmarkHandler}
          dataid={props.dataid}
        />
      </div>
      <div
        className={`${styles.imageContainer} ${props.classNameImage}`}
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
      >
        <Image src={props.src} alt={props.alt} layout="fill" />
        <div
          className={
            isShown
              ? `${styles.hoverOverlay} ${styles.hoverOn}`
              : `${styles.hoverOverlay} ${styles.hoverOff}`
          }
        >
          <div className={styles.hoverPlay}>
            <Image src={playIcon} />
            <p className={styles.play}>Play</p>
          </div>
        </div>
      </div>
      <div className={props.classNameRow}>
        <div className={`${styles.list} ${props.classNameTopRow}`}>
          <p className={styles.listItem}>{props.year}</p>
          <div className={`${styles.type} ${styles.disc}`}>
            <div className={styles.iconContainer}>
              <Image src={props.categoryIcon} alt={props.category} />
            </div>
            <p>{props.category}</p>
          </div>
          <p className={`${styles.rating} ${styles.disc}`}>{props.rating}</p>
        </div>
        <h2 className={`${styles.title} ${props.classNameBottomRow}`}>
          {props.title}
        </h2>
      </div>
    </div>
  );
};

export default VideoItem;
