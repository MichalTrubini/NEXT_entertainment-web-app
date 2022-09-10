import styles from "./search.module.css";
import Image from "next/image";
import searchIcon from '../../../../public/assets/icon-search.svg'

const Search = () => {
  return (
    <form className={styles.form}>
      <input
        className={styles.input}
        placeholder="Search for movies or TV series"
      />
      <div className={styles.imageContainer}>
        <Image src={searchIcon}/>
      </div>
    </form>
  );
};

export default Search;
