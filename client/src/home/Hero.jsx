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
                <div className='hero1'>
                            <div className='sub'>
                                <p className='text1'>¿Qué te apetece?</p>
                            </div>
                            <RestaurantSearchBar />
                </div>  
                <div className='hero2'>
                    {showRestaurantsOpen && <ShowRestaurants />}
                    {loginFormOpen && <Login />}   
                    {createReservasOpen && <CreateReserva />}   
                </div>   
        </div>
    )
}

export default Hero