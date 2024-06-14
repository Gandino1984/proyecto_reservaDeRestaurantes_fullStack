import React from 'react'
import styles from './RestaurantSearchBar.module.css'

function RestaurantSearchBar() {
  return (
    <div className={styles.container}>
        <label className={styles.labelSearch} htmlFor="restaurantSearch"><ion-icon name="search"></ion-icon></label>
        <input type="text" name="restaurantSearch" placeholder='Buscar un restaurante'/>
    </div>
  )
}

export default RestaurantSearchBar
