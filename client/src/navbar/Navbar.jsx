import React, { useContext } from 'react';
import styles from './Navbar.module.css';
import RestaurantSearchBar from './RestaurantSearchBar';
import UserCard from './UserCard.jsx';
import GeneralContext from '../context/GeneralContext.jsx'

function Navbar() {
  const { userLoggedOrRegistered } = useContext(GeneralContext);

  return (
    <div className={styles.containerNavbar}>
      <div className={styles.containerTypewriter}>
        <p className={styles.typewriter}>BookIT</p>
      </div>

      <RestaurantSearchBar />

      { userLoggedOrRegistered && <UserCard />}
    </div>
  );
}

export default Navbar;
