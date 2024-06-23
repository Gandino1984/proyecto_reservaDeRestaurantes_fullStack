import React, { useContext } from 'react';
import RestaurantCard from './RestaurantCard';
import GeneralContext from '../context/GeneralContext';

const ParentComponent = () => {
  const { restaurantCardIsOpen, onCloseRestaurantCard, data, userIsRestaurant } = useContext(GeneralContext);

  return (
    <RestaurantCard
      restaurantCardIsOpen={restaurantCardIsOpen}
      onCloseRestaurantCard={onCloseRestaurantCard}
      data={data}
      userIsRestaurant={userIsRestaurant}
      onSelectRestaurant={handleSelectRestaurant}
    />
  );
};

export default ParentComponent;
