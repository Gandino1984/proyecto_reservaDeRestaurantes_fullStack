import './Hero.css'
import { useContext, useEffect } from 'react'
import GeneralContext from '../context/GeneralContext'
import RestaurantSearchBar from '../navbar/RestaurantSearchBar'
import ShowRestaurants from '../components/mostrarRestaurantes/ShowRestaurants'
import Login from './Login'

function Hero() {
    const { showRestaurantsOpen, loginFormOpen, createReservasOpen } = useContext(GeneralContext)

    return (
        <div className='containerHero'>
                <div className='hero'>
                            <div className='sub'>
                                <p className='text'>¿Qué te apetece?</p>
                            </div>
                            <RestaurantSearchBar />
                </div>  
                
                <div className='heroLoadedComponents'>
                    {showRestaurantsOpen && <ShowRestaurants />}
                    {loginFormOpen && <Login />}   
                    {createReservasOpen && <CreateReserva />}   
                </div>   
        </div>
    )
}

export default Hero