import './Hero.css'
import { useContext, useState } from 'react'
import GeneralContext from '../context/GeneralContext'
import RestaurantSearchBar from '../navbar/RestaurantSearchBar'
import ShowRestaurants from '../components/mostrarRestaurantes/ShowRestaurants'
import Login from './Login'
import CreateReserva from '../components/reserva/reservaCliente'
// import ReservaCliente from '../components/reserva/reservaCliente'
import RestaurantCard from './RestaurantCard'

function Hero() {
  const { showRestaurantsOpen, 
    loginFormOpen, 
    reservaClienteOpen,
  } = useContext(GeneralContext)

  const [selectedRestaurant, setSelectedRestaurant] = useState(null)

  const handleSelectRestaurant = (restaurant) => {
    setSelectedRestaurant(restaurant)
  }

  const handleCloseRestaurantCard = () => {
    setSelectedRestaurant(null)
  }

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
        {reservaClienteOpen && <CreateReserva />}
      </div>   
    </div>
  )
}

export default Hero
