    import './Hero.css'
import { useContext, useEffect } from 'react'
import GeneralContext from '../context/GeneralContext'
import RestaurantSearchBar from '../navbar/RestaurantSearchBar'
import ShowRestaurants from '../components/mostrarRestaurantes/ShowRestaurants'
import Login from './Login'
import MostrarReservasRestaurante from '../components/reserva/MostrarReservasRestaurante'
import ClienteReservas from '../components/reserva/clienteReservas'
import RestaurantCard from './RestaurantCard'

function Hero() {
    const { showRestaurantsOpen, loginFormOpen, createReservasOpen, userIsClient, userIsRestaurant, user } = useContext(GeneralContext)

    return (
        <div className='containerHero'>
                <div className='hero'>
                            <div className='sub'>
                                <p className='text'>¿Qué te apetece comer?</p>
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