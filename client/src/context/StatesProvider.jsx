import React from 'react'
import { useState } from 'react'
import GeneralContext from './GeneralContext';

function StatesProvider({children}){

  const [user, setUser] = useState(null);
  
  const [userByType, setUserByType] = useState('client') 

  const [restaurantCardOpen, setrestaurantCardOpen] = useState(false);

  const [loginFormOpen, setloginFormOpen] = useState(false);
  
  const [createReservasOpen, setcreateReservasOpen] = useState(false);

  const [reservasRestauranteOpen, setreservasRestauranteOpen] = useState(false);
  
  const [restaurantData, setrestaurantData] = useState(null);

  const [userIsClient, setuserIsClient] = useState(true);

  const [userIsRestaurant, setuserIsRestaurant] = useState(false);
  const [userActionIsLogin, setuserActionIsLogin] = useState(true);
  const [userActionIsRegister, setuserActionIsRegister] = useState(false);


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
    reservasRestauranteOpenHandler,
    userIsClient,
    setuserIsClient,
    userIsRestaurant,
    setuserIsRestaurant,
    userActionIsLogin,
    setuserActionIsLogin,
    userActionIsRegister,
    setuserActionIsRegister,
    createReservasOpen,
    setcreateReservasOpen
  };

  return (
    <GeneralContext.Provider value={contextValue}>
      {children}
    </GeneralContext.Provider>
  );
}

export default StatesProvider

