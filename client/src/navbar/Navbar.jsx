import React, { useEffect } from 'react'
import styles from './Navbar.module.css'
import { useState } from 'react'
import RestaurantSearchBar from './RestaurantSearchBar';

function Navbar() {

  return (
    <>
        <div className={styles.containerNavbar}>
              <div className={styles.containerTypewriter}>
                    <p className={styles.typewriter}>Book-IT</p>
              </div>

              <RestaurantSearchBar />

        </div>
    </>
  )
    
}

export default Navbar
