import React, { useEffect } from 'react'
import styles from './Navbar.module.css'
import { useState } from 'react'
import RestaurantSearchBar from './RestaurantSearchBar';
import ClientCard from './ClientCard';

function Navbar({searchBtnClick}) {

  return (
    <>
        <div className={styles.containerNavbar}>
              <div className={styles.containerTypewriter}>
                    <p className={styles.typewriter}>Book&IT</p>
              </div>

              <RestaurantSearchBar searchBtnClick={e=>searchBtnClick(e)}/>

              <ClientCard />

        </div>
    </>
  )
    
}

export default Navbar
