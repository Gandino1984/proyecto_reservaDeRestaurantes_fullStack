import React from 'react'
import { useState, useEffect } from 'react'
import GeneralContext from '../../context/GeneralContext';
import { getAllRestaurantes } from '../../utils/restauranteFetch'; 
import './ShowRestaurants.css'
import { useContext } from 'react';

function ShowRestaurants() {

  const { restaurantData,
          setrestaurantData,
          arrayRestaurantData,
          setarrayRestaurantData
        } = useContext(GeneralContext);

        console.log('ShowRestaurants, Context: restaurantData= ', restaurantData)

  async function searchRestaurants(){
    const response = await getAllRestaurantes();
    setrestaurantData(response.data);
    console.log("response.data= ", response.data) ;
  }
  
  useEffect(() => {
    searchRestaurants();
  }, []);

  function mappedArrayhandler(array){
    setarrayRestaurantData(array);
  }

  useEffect(
    () => {
      if (restaurantData) {
        const arrayMapped = restaurantData.map(restaurant => 
          <li key={restaurant.Restaurante_id} className='card'>
            <h3>{restaurant.Name}</h3>
            <div className='cardSchedule'>
                <h5>{restaurant.Hora_Apertura}</h5>
                <h5>{restaurant.Hora_Cierre}</h5>
            </div>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum doloremque magnam tenetur hic quisquam iure quibusdam eos eveniet aliquid iste officia non quas.</p>
          </li>
        )
        mappedArrayhandler(arrayMapped)
        
      } 
  }
  , [restaurantData]
);


  
  return (
    <div className='containerShowRestaurants'>
        <div className='showRestaurants'>
          <div className='cardGroup'>
              <ul>  
                      {arrayRestaurantData}
              </ul>
          </div>
        </div>
    </div>
  )
}

export default ShowRestaurants
