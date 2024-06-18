import styles from './Hero.module.css'
import { useContext, useEffect } from 'react'
import GeneralContext from '../context/GeneralContext'
import CreateReserva from '../components/reserva/reservaCliente'


function Hero() {
    const { setLoginFormOpenHandler, createReservasOpen } = useContext(GeneralContext)
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
                {createReservasOpen && <CreateReserva />}
              
        </div>
    )
}

export default Hero