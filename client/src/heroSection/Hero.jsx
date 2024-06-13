import styles from './Hero.module.css'

function Hero() {
    return (
        <div className={styles.container}>
                <div className={styles.hero}>
                        <div className={styles.text1}>
                            <p>Dinos dónde</p>
                        </div>
                        <div className={styles.text2}>
                            <p className={styles.text3}>Book-it</p>
                            <p>dice come</p>
                        </div>
                </div>
                <div className={styles.btnContainer}>
                    <button className={styles.btn}>RESERVA YA</button>
                </div>
        </div>
    )
}

export default Hero