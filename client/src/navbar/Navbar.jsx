import React, { useContext } from 'react';
import styles from './Navbar.module.css';
import RestaurantSearchBar from './RestaurantSearchBar';
import UserCard from './UserCard.jsx';
import GeneralContext from '../context/GeneralContext.jsx'
import logoImg from './guindilla.png';

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
            <p className={styles.title}>jan<span className={styles.and}>&</span>eman</p>
            <div className={styles.logoContainer}>
                <img src={logoImg} alt="logo image" />
            </div>
        </div>
      { !userLoggedOrRegistered && <button className={styles.btn} onClick={e=>empezarBtnClick(e)}>EMPEZAR</button>}
      { userLoggedOrRegistered && <UserCard />}
    </div>
  );
}

export default Navbar;
