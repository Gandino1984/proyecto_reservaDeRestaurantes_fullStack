import React from 'react'
import styles from './RestaurantSearchBar.module.css'

function RestaurantSearchBar({searchBtnClick}) {
  function searchBtnClickhandler(e){
    e.preventDefault(); 
    searchBtnClick(e)
  }
  return (
    <div className={styles.container}>
        <form onSubmit={searchBtnClickhandler}>
          <input className={styles.inputSearch} type="text" name="restaurantSearch" placeholder='Buscar un restaurante'/>

          <button type="submit" className={styles.labelSearch}>
            <ion-icon name="search"></ion-icon>
          </button>
        </form>
    </div>
  )
}

export default RestaurantSearchBar
