import React from 'react'
import { useState } from 'react'
import GeneralContext from './GeneralContext';

function StatesProvider({children}){

  const [user, setUser] = useState(null);
  const [userByType, setUserByType] = useState('client') 
  const [restaurantCardOpen, setrestaurantCardOpen] = useState(true);
  const [loginFormOpen, setloginFormOpen] = useState(false);
  const [reservasRestauranteOpen, setreservasRestauranteOpen] = useState(false);
  const [restaurantData, setrestaurantData] = useState(null);


  function setUserByTypeToggle(e){
    if(e.target,value === 'client'){
        setUserByType('restaurant')
    }
    else{
      setUserByType('client')
    }
  }

  function reservasRestauranteOpenHandler(e) {
    setreservasRestauranteOpen(prevState => !prevState);
  }

  function setLoginFormOpenHandler(e) {
    setloginFormOpen(prevState => !prevState);
  }

  const contextValue = {
    user,
    setUser,
    userByType,
    setUserByType,
    setUserByTypeToggle,
    loginFormOpen,
    setloginFormOpen,
    restaurantCardOpen,
    setrestaurantCardOpen,
    restaurantData,
    setrestaurantData,
    setLoginFormOpenHandler,
    reservasRestauranteOpenHandler
  };

  return (
    <GeneralContext.Provider value={contextValue}>
      {children}
    </GeneralContext.Provider>
  );
}

export default StatesProvider

