import React from 'react'
import { useState } from 'react'
import { GeneralContext } from './GeneralContext'

function StatesProvider(){

  const [user, setUser] = useState(null);
  const [userByType, setUserByType] = useState('client') 
  
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
          setUserByTypeToggle
      }}
      
      { children }
    </GeneralContext.provider>
  )
}

export default StatesProvider

