import React, { useState, useEffect, useContext, useRef } from 'react';
import GeneralContext from '../../context/GeneralContext';
import { getAllRestaurantes } from '../../utils/restauranteFetch';
import './ShowRestaurants.css';

function ShowRestaurants() {
  const { restaurantData, setrestaurantData, arrayRestaurantData, setarrayRestaurantData } = useContext(GeneralContext);
  const scrollContainerRef = useRef(null);

  async function searchRestaurants() {
    try {
      const response = await getAllRestaurantes();
      setrestaurantData(response.data);
      console.log("response.data= ", response.data);
    } catch (error) {
      console.error('Failed to fetch restaurants:', error);
    }
  }

  useEffect(() => {
    searchRestaurants();
  }, []);

  useEffect(() => {
    if (restaurantData) {
      const arrayMapped = restaurantData.map(restaurant => (
        <li key={restaurant.Restaurante_id} className='card'>
          <p className='cardName'>{restaurant.Name}<ion-icon name="star"></ion-icon></p>
          <div className='cardSchedule'>
            <p>Apertura: {restaurant.Hora_Apertura}</p>
            <p>Cierre: {restaurant.Hora_Cierre}</p>
          </div>
        </li>
      ));
      
      setarrayRestaurantData(arrayMapped);
    }
  }, [restaurantData, setarrayRestaurantData]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <>
      <button className='scrollButton left' onClick={scrollLeft}><ion-icon name="chevron-back-outline"></ion-icon></button>
      <div className='showRestaurants' ref={scrollContainerRef} >
        <ul className='cardGroup' >
          {arrayRestaurantData}
        </ul>
      </div>
      <button className='scrollButton right' onClick={scrollRight}><ion-icon name="chevron-forward-outline"></ion-icon></button>
    </>
  );
}

export default ShowRestaurants;