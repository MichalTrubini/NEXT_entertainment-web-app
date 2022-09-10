import Image from "next/image";
import styles from "./videoItem.module.css";
import bookmark from "../../../public/assets/icon-bookmark-empty.svg";

const VideoItem = (props) => {
  return (
    <div className={styles.video}>
      <div className={styles.bookmarkContainer}>
        <Image src={bookmark} />
      </div>
      <div className={`${styles.imageContainer} ${props.classNameImage}`}>
        <Image src={props.src} alt={props.alt} layout='fill'/>
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
        <h2 className={`${styles.title} ${props.classNameBottomRow}`}>{props.title}</h2>
      </div>
    </div>
  );
};

export default VideoItem;
