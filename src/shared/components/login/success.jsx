import styles from './success.module.css'

const Success = () => {
    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <p className={styles.sucess}>SUCCESS! </p>
                <p className={styles.message}>Redirecting to login page...</p>
                <div>
                    <div className={styles.dotWindmill}></div>
                </div>
            </div>
        </div>
    )
}

export default Success;