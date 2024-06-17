import React from 'react'
import {useState, useContext} from 'react'
import stylesApp from '../App.module.css'
import styles from './Landing.module.css'
import bg1 from '../images/bgHome.jpg'
import Login from './Login.jsx'
import Navbar from '../navbar/Navbar.jsx'
import Hero from './Hero.jsx'
import RestaurantCard from './RestaurantCard.jsx'
import TarjetasRestaurante from "../components/restauranteReservas/TarjetasRestaurante.jsx"
// import UserContext from '../context/Usercontext';
import MostrarReservas from '../components/reserva/MostrarReservas.jsx'
import { useContext } from 'react'
import GeneralContext from '../context/GeneralContext.jsx'

function Landing({children}){

  const {user} = useContext(GeneralContext)

  const [restaurantCardOpen, setrestaurantCardOpen] = useState(true);

  const [loginFormOpen, setloginFormOpen] = useState(false);

  const [restaurantData, setrestaurantData] = useState(null);

  function onHeroBtnClick(){
    setloginFormOpen(true);
  }

  function onCloseBtnLogin(){
    setloginFormOpen(false);
  }

  function onNavbarSearchBtnClick(e){
    console.log(e)
  }


  

  return (
        <div className={styles.containerLanding}>
                <div className={styles.background} />
                <Navbar searchBtnClick={e=>onNavbarSearchBtnClick(e)}/>
                {loginFormOpen && <Login closeBtnClick={onCloseBtnLogin} />}
                <Hero heroBtnClick={onHeroBtnClick}/>
                {restaurantCardOpen && <RestaurantCard />} 
        </div>
  )
}

export default Landing
