
import React from 'react';
import styles from './RestaurantCard.module.css';

const RestaurantCard = ({ restaurantCardIsOpen, onCloseRestaurantCard, data }) => {
    if (!restaurantCardIsOpen) return null;
  
    return (
      <div className="modal-overlay">
        <div className="modal">
          <button className="close-button" onClick={onCloseRestaurantCard}>X</button>
          <h2>Resultados de la Búsqueda</h2>
          <ul>
            {data.map(restaurant => (
              <li key={restaurant.Restaurante_id}>
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

  export default RestaurantCard