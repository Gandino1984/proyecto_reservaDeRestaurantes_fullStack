import React, { useState, useEffect, useContext, useRef } from 'react';
import GeneralContext from '../../context/GeneralContext';
import { getAllRestaurantes } from '../../utils/restauranteFetch';
import './ShowRestaurants.css';

function ShowRestaurants() {
  const { restaurantData, setrestaurantData, arrayRestaurantData, setarrayRestaurantData } = useContext(GeneralContext);
  const scrollContainerRef = useRef(null);

  console.log('ShowRestaurants, Context: restaurantData= ', restaurantData);

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
          <h3>{restaurant.Name}</h3>
          <div className='cardSchedule'>
            <h5>{restaurant.Hora_Apertura}</h5>
            <h5>{restaurant.Hora_Cierre}</h5>
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