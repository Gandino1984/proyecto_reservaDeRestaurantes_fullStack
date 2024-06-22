import React from 'react'
import { useState } from 'react'
import GeneralContext from './GeneralContext';

function StatesProvider({children}){

  //user related states
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  
  const [userByType, setUserByType] = useState('client') 

  const [restaurantData, setrestaurantData] = useState(null);
  const [restauranteID, setRestauranteID] = useState(null);

  const [userIsClient, setuserIsClient] = useState(true);
  const [userIsRestaurant, setuserIsRestaurant] = useState(false);
  const [userActionIsLogin, setuserActionIsLogin] = useState(true);
  const [userActionIsRegister, setuserActionIsRegister] = useState(false);
  const [userLoggedOrRegistered, setuserLoggedOrRegistered] = useState(false)
  const [reservasRestauranteOpen, setreservasRestauranteOpen] = useState(false);

  //open&close states
  const [showRestaurantsOpen, setshowRestaurantsOpen] = useState(true);
  const [loginFormOpen, setloginFormOpen] = useState(false);
  const [createReservasOpen, setcreateReservasOpen] = useState(false);
  const [mostrarReservasRestauranteOpen, setmostrarReservasRestauranteOpen] = useState(false)

  //info states
  const [arrayRestaurantData, setarrayRestaurantData] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [restaurantes, setRestaurantes] = useState([]);
  const [restaurantData, setrestaurantData] = useState(null);
  const [reservaRestauranteExitosa, setreservaRestauranteExitosa] = useState(false)

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
    userId,
    setUserId,
    userName,
    setUserName,
    userEmail,
    setUserEmail,
    userByType,
    setUserByType,
    setUserByTypeToggle,
    loginFormOpen,
    setloginFormOpen,
    setLoginFormOpenHandler,
    showRestaurantsOpen,
    setshowRestaurantsOpen,
    restaurantData,
    setrestaurantData,
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
    setcreateReservasOpen,
    userLoggedOrRegistered,
    setuserLoggedOrRegistered,
    reservas,
    setReservas,
    restaurantes,
    setRestaurantes,
    mostrarReservasRestauranteOpen,
    setmostrarReservasRestauranteOpen,
    reservaRestauranteExitosa,
    setreservaRestauranteExitosa,
    arrayRestaurantData,
    setarrayRestaurantData,
    reservasRestaurantOpen,
    setreservasRestaurantOpen,
    userId,
    setUserId,
    restauranteID,
    setRestauranteID
  };

  return (
    <GeneralContext.Provider value={contextValue}>
      {children}
    </GeneralContext.Provider>
  );
}

export default StatesProvider

