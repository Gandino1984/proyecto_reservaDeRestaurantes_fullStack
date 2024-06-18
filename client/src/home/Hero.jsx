import styles from './Hero.module.css'
import { useContext, useEffect } from 'react'
import GeneralContext from '../context/GeneralContext'
import CreateReserva from '../components/reserva/reservaCliente'


function Hero() {
    const { setLoginFormOpenHandler, createReservasOpen, setcreateReservasOpen, userLoggedOrRegistered } = useContext(GeneralContext)

    function heroBtnClick(e) {
        e.preventDefault();
        if(userLoggedOrRegistered==false){
            setLoginFormOpenHandler(true)
          
        }else{
            alert("ya estás loggeado")
            setcreateReservasOpen(true)
        }
      }

    return (
        <div className={styles.container}>
                <div className={styles.hero}>
                            <div className={styles.sub}>
                                <p className={styles.text1}>Dinos cuánta <br />hambre tienes</p>
                                   <button className={styles.btn} onClick={e=>heroBtnClick(e)}>INICIA SESIÓN</button>
                            </div>
                </div>     
        </div>
    )
}

export default Hero