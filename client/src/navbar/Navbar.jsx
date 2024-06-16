import React, { useEffect } from 'react'
import styles from './Navbar.module.css'
import { useState } from 'react'
import RestaurantSearchBar from './RestaurantSearchBar';

function Navbar({searchBtnClick}) {

  return (
    <>
        <div className={styles.containerNavbar}>
              <div className={styles.containerTypewriter}>
                    <p className={styles.typewriter}>Book&IT</p>
              </div>

              <RestaurantSearchBar searchBtnClick={e=>searchBtnClick(e)}/>

        </div>
    </>
  )
    
}

export default Navbar
