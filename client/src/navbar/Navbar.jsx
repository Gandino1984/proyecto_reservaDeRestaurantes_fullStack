import React from 'react'
import styles from './Navbar.module.css'
import { useState } from 'react'

function Navbar({handleUserTypeSelection}) {

  function onChangeRadiohandler(e){
    handleUserTypeSelection(e);
    //agregar aquí la clase active para los label del navbar
    // visibilizar login on click 
  }
s
  return (
    <>
        <div className={styles.containerNavbar}>
              <div className={styles.containerTitle}>
                    <p className={styles.title}>Book-it</p>
              </div>
        
              <div className={styles.radioBtnsContainer}>
                    <div className={styles.labels}>
                        <label  htmlFor="clientOption">CLIENTE</label>
                        <label  htmlFor="restaurantOption">RESTAURANTE</label>
                    </div>                   
                    <div className={styles.radios} onChange={e=>onChangeRadiohandler(e)}>
                        <input className={styles.radioOption} value="client"  id="clientOption" name='userType' type="radio" />
                        <input className={styles.radioOption} value="restaurant" id="restaurantOption" name='userType' type="radio" />
                    </div>   
                  
              </div>
        </div>
    </>
  )
    
}

export default Navbar
