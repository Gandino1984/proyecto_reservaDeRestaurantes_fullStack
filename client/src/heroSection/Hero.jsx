import styles from './Hero.module.css'

function Hero() {
    return (
        <div className={styles.container}>
                <div className={styles.hero}>
                        <div className={styles.text1}>
                            <p>Dinos cuánta <br />hambre tienes</p>
                        </div>
                        <div className={styles.text2}>
                            <p className={styles.text3}> Book-IT programa <br /> tu solución</p>
                            <div className={styles.btnContainer}>
                                <button className={styles.btn}>RESERVA YA</button>
                            </div>
                        </div>
                </div>
              
        </div>
    )
}

export default Hero