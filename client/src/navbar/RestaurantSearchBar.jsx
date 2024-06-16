import React from 'react'
import styles from './RestaurantSearchBar.module.css'

function RestaurantSearchBar({searchBtnClick}) {
  function searchBtnClickhandler(e){
    searchBtnClick(e)
  }
  return (
    <div className={styles.container}>
        {/* cambiar este label a type submit */}
        <label onClick={e=>searchBtnClickhandler(e)} className={styles.labelSearch} htmlFor="restaurantSearch"><ion-icon name="search"></ion-icon></label>
        <input className={styles.inputSearch} type="text" name="restaurantSearch" placeholder='Buscar un restaurante'/>
    </div>
  )
}

export default RestaurantSearchBar
