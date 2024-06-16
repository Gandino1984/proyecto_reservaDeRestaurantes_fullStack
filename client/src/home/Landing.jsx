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

  const [restaurantCardOpen, setrestaurantCardOpen] = useState(false);

  const [loginFormOpen, setloginFormOpen] = useState(false);

  //esta func usa el tipo de usuario seleccionado en el navbar
  function onHeroBtnClick(){
    setloginFormOpen(true);
  }

  function onCloseBtnLogin(){
    setloginFormOpen(false);
  }

  

  return (
        <div className={styles.containerLanding}>
                <div className={styles.background} />
                <Navbar />
                {loginFormOpen && <Login closeBtnClick={onCloseBtnLogin} />}
                <Hero heroBtnClick={onHeroBtnClick}/>
                {restaurantCardOpen && <RestaurantCard />}     
        </div>
  )
}

export default Landing
