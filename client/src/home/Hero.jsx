import styles from './Hero.module.css'
import { useContext, useEffect } from 'react'
import GeneralContext from '../context/GeneralContext'


function Hero() {
    const { setLoginFormOpenHandler } = useContext(GeneralContext)
    useEffect(() => {
        console.log(setLoginFormOpenHandler);
    }, [setLoginFormOpenHandler]);

    return (
        <div className={styles.container}>
                <div className={styles.hero}>
                            <div className={styles.sub}>
                                <p className={styles.text1}>Dinos cuánta <br />hambre tienes</p>
                                   <button className={styles.btn} onClick={e=>setLoginFormOpenHandler(e)}>INICIA SESIÓN</button>
                            </div>
                </div>
              
        </div>
    )
}

export default Hero