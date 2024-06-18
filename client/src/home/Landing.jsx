import React from 'react'
import {useState, useContext} from 'react'
import stylesApp from '../App.module.css'
import styles from './Landing.module.css'
import bg1 from '../images/bgHome.jpg'
import Login from './Login.jsx'
import Navbar from '../navbar/Navbar.jsx'
import Hero from './Hero.jsx'
// import RestaurantCard from './RestaurantCard.jsx'
import TarjetasRestaurante from "../components/restauranteReservas/TarjetasRestaurante.jsx"
// import UserContext from '../context/Usercontext';
import MostrarReservasRestaurante from '../components/reserva/MostrarReservasRestaurante.jsx'
import GeneralContext from '../context/GeneralContext.jsx'
import CreateReserva from '../components/reserva/reservaCliente.jsx'

function Landing({children}){

  const {user, loginFormOpen, setloginFormOpenHandler, userIsClient, createReservasOpen} = useContext(GeneralContext)

  const [restaurantData, setrestaurantData] = useState(null);

  function onHeroBtnClick(e){
    setloginFormOpenHandler(e);
  }

  function onCloseBtnLogin(e){
    setloginFormOpenHandler(e);
  }

  function onNavbarSearchBtnClick(e){
    // console.log(e)
  }

  return (
        <div className={styles.containerLanding}>
                <div className={styles.background} />

                <Navbar searchBtnClick={e=>onNavbarSearchBtnClick(e)}/>
                {loginFormOpen && <Login closeBtnClick={onCloseBtnLogin} />}  
                <Hero heroBtnClick={onHeroBtnClick}/>
                {createReservasOpen && <CreateReserva />}
                
        </div>
  )
}

export default Landing
