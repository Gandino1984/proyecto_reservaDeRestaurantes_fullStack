import React from 'react'
import styles from './Navbar.module.css'
import { useState } from 'react'

function Navbar({handleUserTypeSelection}) {

  function onChangeRadiohandler(e){
    handleUserTypeSelection(e);
  }

  return (
    <>
        <div className={styles.containerNavbar}>
              <div className={styles.containerTitle}>
                    <p className={styles.title}>Book-it</p>
              </div>
        
              <div className={styles.radioBtnsContainer}>
                    <div className={styles.radios} onChange={e=>onChangeRadiohandler(e)}>
                        <input className={styles.radioOption} id="clientOption" name='userType' type="radio" value="client" />
                        <input className={styles.radioOption} id="restaurantOption" name='userType' type="radio" value="restaurant" />
                    </div>   
                    <div className={styles.labels}>
                        <label htmlFor="clientOption">CLIENTE</label>
                        <label htmlFor="restaurantOption">RESTAURANTE</label>
                    </div> 
              </div>
        </div>
    </>
  )
    
}

export default Navbar
