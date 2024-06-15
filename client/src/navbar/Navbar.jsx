import React, { useEffect } from 'react'
import styles from './Navbar.module.css'
import { useState } from 'react'
import RestaurantSearchBar from './RestaurantSearchBar';

function Navbar({handleUserTypeSelection, loginFormOpen, onCloseRestaurantCard}) {

  const [selectorState, setselectorState]  = useState("activeSelector");
  
  function onChangeRadiohandler(e){
    handleUserTypeSelection(e);
    setselectorState("inactiveSelector") 
  }

  useEffect(() => {
    if(loginFormOpen === true){
      setselectorState("inactiveSelector") 
    }else{
      setselectorState("activeSelector")
    }
  },[loginFormOpen])
   
  function onCloseRestaurantCardHandler(e){
    onCloseRestaurantCard();
  }

  return (
    <>
        <div className={styles.containerNavbar}>
              <div className={styles.containerTypewriter}>
                    <p className={styles.typewriter}>Book-IT  !!</p>
              </div>
        
              <div className={`${styles.radioBtnsContainer} ${styles[selectorState]}`}>
                    <div className={styles.labels}>
                        <label  htmlFor="clientOption">CLIENTE</label>
                        <label  htmlFor="restaurantOption">RESTAURANTE</label>
                    </div>                   
                    <div className={styles.radios} onChange={e=>onChangeRadiohandler(e)}>
                        <input className={styles.radioOption} value="client"  id="clientOption" name='userType' type="radio" />
                        <input className={styles.radioOption} value="restaurant" id="restaurantOption" name='userType' type="radio" />
                    </div>   
              </div>

              <RestaurantSearchBar onCloseRestaurantCard={onCloseRestaurantCard}/>

        </div>
    </>
  )
    
}

export default Navbar
