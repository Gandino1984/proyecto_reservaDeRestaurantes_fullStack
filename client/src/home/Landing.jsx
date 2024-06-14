import React from 'react'
import {useState} from 'react'
import stylesApp from '../App.module.css'
import styles from './Landing.module.css'
import bg1 from '../images/bgHome.jpg'
import Login from './Login.jsx'
import Navbar from '../navbar/Navbar.jsx'
import Hero from '../heroSection/Hero.jsx'
import RestaurantCard from './RestaurantCard.jsx'

function Landing(){
  // default state de tipo de usuario
  const [userType, setuserType] = useState("");

  const [restaurantCardIsOpen, setrestaurantCardIsOpen] = useState(false);

  function onCloseRestaurantCard(e){
    setrestaurantCardIsOpen(true);
  }

  //esta func usa el tipo de usuario seleccionado en el navbar
  function handleUserTypeSelection(e){
      setuserType(e.target.value);
  }


  const [loginFormOpen, setloginFormOpen] = useState(false);

  function loginFormStateChangeHandler(){
    setloginFormOpen((loginFormOpen)=>!loginFormOpen);
  }

  return (
        <div className={styles.containerLanding}>
                <div className={styles.background} />
                <Navbar handleUserTypeSelection={handleUserTypeSelection} loginFormOpen={loginFormOpen} onCloseRestaurantCard={onCloseRestaurantCard}/>
                <Login userType={userType} loginFormStateChangeHandler={loginFormStateChangeHandler}/>
                {restaurantCardIsOpen && <RestaurantCard restaurantCardIsOpen={restaurantCardIsOpen} onCloseRestaurantCard={e=>onCloseRestaurantCard(e)}/>}<RestaurantCard />
                <Hero />
        </div> 
  )
}

export default Landing
