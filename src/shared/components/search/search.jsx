import styles from "./search.module.css";
import Image from "next/image";
import searchIcon from "../../../../public/assets/icon-search.svg";
import { useState } from "react";

const Search = (props) => {
  const [inputValue, setInputValue] = useState("");

  const inputHandler = (event) => {
    setInputValue(event.target.value)
  }

  const submitHandler = (event) => {
    event.preventDefault();
    props.onSubmitUserData(inputValue);
  }

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <input
        className={styles.input}
        type="text"
        value={inputValue}
        placeholder={props.prompt}
        onChange={inputHandler}
      />
      <div className={styles.imageContainer}>
        <Image src={searchIcon} onClick={submitHandler} alt='search'/>
      </div>
    </form>
  );
};

export default Search;
