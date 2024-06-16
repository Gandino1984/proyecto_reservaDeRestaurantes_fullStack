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
import UserContext from '../context/Usercontext';
import MostrarReservas from '../components/reserva/MostrarReservas.jsx'


function Landing(){
  const { user } = useContext(UserContext);

  // default state de tipo de usuario

  const [restaurantCardOpen, setrestaurantCardOpen] = useState(true);

  const [loginFormOpen, setloginFormOpen] = useState(false);

  const [restaurantData, setrestaurantData] = useState(null);

  //esta func usa el tipo de usuario seleccionado en el navbar
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
