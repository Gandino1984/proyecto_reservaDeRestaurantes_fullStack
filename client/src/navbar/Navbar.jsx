import React, { useContext } from 'react';
import styles from './Navbar.module.css';
import RestaurantSearchBar from './RestaurantSearchBar';
import UserCard from './UserCard.jsx';
import GeneralContext from '../context/GeneralContext.jsx'

function Navbar() {
  const { userLoggedOrRegistered, setLoginFormOpenHandler } = useContext(GeneralContext);

  function empezarBtnClick(e) {
    e.preventDefault();
    if(userLoggedOrRegistered===false){
        setLoginFormOpenHandler(true)
        setshowRestaurantsOpen(false)
      
    }else{
        alert("ya estás loggeado")
    }
 
}


  return (
    <div className={styles.containerNavbar}>
      <div className={styles.containerTitle}>
        <p className={styles.title}>Guindilla</p>
      </div>
      { !userLoggedOrRegistered && <button className={styles.btn} onClick={e=>empezarBtnClick(e)}>EMPEZAR</button>}
      {/* <RestaurantSearchBar /> */}

      { userLoggedOrRegistered && <UserCard />}
    </div>
  );
}

export default Navbar;
