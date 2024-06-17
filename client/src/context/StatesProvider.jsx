import React from 'react'
import { useState } from 'react'
import { GeneralContext } from './GeneralContext'

function StatesProvider({children}){

  const [user, setUser] = useState(null);
  const [userByType, setUserByType] = useState('client') 
  const [restaurantCardOpen, setrestaurantCardOpen] = useState(true);
  const [loginFormOpen, setloginFormOpen] = useState(false);
  const [restaurantData, setrestaurantData] = useState(null);


  function setUserByTypeToggle(e){
    if(e.target,value==='client'){
        setUserByType('restaurant')
    }
    else{
      setUserByType('client')
    }
  }


  return (
    <GeneralContext.provider>
        value={{
            user, 
            userByType, 
            setUserByTypeToggle,
            loginFormOpen,
            restaurantCardOpen,
            restaurantData
        }}

        { children }
    </GeneralContext.provider>
  )
}

export default StatesProvider

