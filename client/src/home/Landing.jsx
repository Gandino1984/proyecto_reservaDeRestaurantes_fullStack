import React from 'react'
import {useState} from 'react'
import stylesApp from '../App.module.css'
import styles from './Landing.module.css'
import bg1 from '../images/bgHome.jpg'
import Login from './Login.jsx'
import Navbar from '../navbar/Navbar.jsx'

function Landing(){

  const [userType, setuserType] = useState("");

  function handleUserTypeSelection(e){
    setuserType(e.target.value);
    // console.log("Landing: userType= ", userType);
  }

  return (
        <div className={styles.containerLanding}>
                <div className={styles.background} />
                <Navbar handleUserTypeSelection={handleUserTypeSelection}/>
                <Login userType={userType}/>
        </div> 
  )
}

export default Landing
