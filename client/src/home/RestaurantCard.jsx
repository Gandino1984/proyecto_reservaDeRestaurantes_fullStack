import React from 'react';
import './RestaurantCard.css';

const RestaurantCard = ({ restaurantCardIsOpen, onCloseRestaurantCard, data, userIsRestaurant, onSelectRestaurant }) => {
  if (!restaurantCardIsOpen || data == null || userIsRestaurant) return null;
  
  return (
    <div className='containerRestaurantCard'>
      <div className='restaurantCard'>
        <button className='closeBtnRestaurantCard' value="closeRestaurantCard" onClick={(e) => onCloseRestaurantCard(e)}>X</button>
        <h2>Resultados de la Búsqueda</h2>
        <ul>
          {data.map(restaurant => (
            <li key={restaurant.Restaurante_id} onClick={() => onSelectRestaurant(restaurant)}>
              <h3>{restaurant.Name}</h3>
              <p>Tipo: {restaurant.Tipo_Restaurante}</p>
              <p>Hora de Apertura: {restaurant.Hora_Apertura}</p>
              <p>Hora de Cierre: {restaurant.Hora_Cierre}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RestaurantCard;
