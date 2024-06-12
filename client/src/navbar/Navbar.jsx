import React from 'react'
import styles from './Navbar.module.css'

function Navbar() {
  return (
    <>
        <div className={styles.containerNavbar}>
              <div className={styles.containerTitle}>
                    <p className={styles.title}>Book-it</p>
              </div>
        
              <div className={styles.radioBtnsContainer}>
                    <div className={styles.radios}>
                        <input id="clientOption" name='userType' type="radio" className={styles.radioOption} />
                        <input id="restaurantOption" name='userType' type="radio" className={styles.radioOption} />
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
