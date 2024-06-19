import React from 'react'
import { useState, useEffect } from 'react'
import GeneralContext from '../../context/GeneralContext';
import { getAllRestaurantes } from '../../utils/restauranteFetch'; 
import styles from './ShowRestaurants.module.css'
import { useContext } from 'react';

function ShowRestaurants() {

  const { restaurantCardOpen, 
          setrestaurantCardOpen,
          restaurantData,
          setrestaurantData
        } = useContext(GeneralContext);

  async function searchRestaurants(){
    const response = await getAllRestaurantes();
    console.log("ShowRestaurants: restaurantData= ", response);
    setrestaurantData(response.data);
  }

  useEffect(() => {
    searchRestaurants();
  }, []);

  return (
    <div className={styles.container}>
        <div className={styles.cardContainer}>
          <div className={styles.card}>

          </div>
        </div>
    </div>
  )
}

export default ShowRestaurants
