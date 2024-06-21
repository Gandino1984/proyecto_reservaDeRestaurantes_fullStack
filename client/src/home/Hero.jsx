import styles from './Hero.module.css'
import { useContext, useEffect } from 'react'
import GeneralContext from '../context/GeneralContext'
import RestaurantSearchBar from '../navbar/RestaurantSearchBar'
import ShowRestaurants from '../components/mostrarRestaurantes/ShowRestaurants'


function Hero() {
    const { showRestaurantsOpen } = useContext(GeneralContext)

    return (
        <div className={styles.containerHero}>
                <div className={styles.hero1}>
                            <div className={styles.sub}>
                                <p className={styles.text1}>¿Servilleta?</p>
                                   {/* <button className={styles.btn} onClick={e=>heroBtnClick(e)}>INICIA SESIÓN</button> */}
                            </div>
                            <RestaurantSearchBar />
                            <div className={styles.sub}>
                                <p className={styles.text2}>¿O delantal?</p>
                                   {/* <button className={styles.btn} onClick={e=>heroBtnClick(e)}>INICIA SESIÓN</button> */}
                            </div>
                </div>  
                <div className={styles.hero2}>
                    {showRestaurantsOpen && <ShowRestaurants />}    
                </div>   
        </div>
    )
}

export default Hero