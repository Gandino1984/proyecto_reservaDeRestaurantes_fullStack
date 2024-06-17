import React from 'react'
import styles from './RestaurantSearchBar.module.css'

function RestaurantSearchBar({searchBtnClick}) {
  function searchBtnClickhandler(e){
    e.preventDefault(); 
    searchBtnClick(e)
  }
  return (
    <div className={styles.container}>
        <form  onSubmit={searchBtnClickhandler}>
           <div className={styles.containerForm}>
              <input className={styles.inputSearch} type="text" name="restaurantSearch" placeholder='Buscar un restaurante'/>
                <button type="submit" className={styles.btnSearch}>
                  <ion-icon name="search"></ion-icon>
                </button>
           </div>
            
        </form>
    </div>
  )
}

export default RestaurantSearchBar
