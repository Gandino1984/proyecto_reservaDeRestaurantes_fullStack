import styles from './Hero.module.css'

function Hero({heroBtnClick}) {
    return (
        <div className={styles.container}>
                <div className={styles.hero}>
                            <div className={styles.sub}>
                                <p className={styles.text1}>Dinos cuánta <br />hambre tienes</p>
                                <button className={styles.btn} onClick={e=>heroBtnClick(e)}>RESERVA UNA MESA</button>
                            </div>
                </div>
              
        </div>
    )
}

export default Hero