import styles from './bookmarkError.module.css'
import close from '../../../public/assets/icon-close.svg'
import Image from 'next/image';

const BookmarkError = (props) => {
    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <div className={styles.close}>
                    <Image src={close} alt='close modal' onClick={props.closeModal}/>
                </div>
                <p className={styles.warning}>You must be logged in to bookmark movies and TV shows!</p>
                <button className={styles.dismiss} onClick={props.closeModal}>dismiss</button>
            </div>
        </div>
    )
}

export default BookmarkError;