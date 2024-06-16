import React, { useContext } from 'react';
import styles from './Navbar.module.css';
import RestaurantSearchBar from './RestaurantSearchBar';
import ClientCard from './ClientCard';
import UserContext from '../context/Usercontext';

function Navbar({ searchBtnClick }) {
  const { user } = useContext(UserContext);
  console.log("USER EN NAVBAR", user)

  return (
    <div className={styles.containerNavbar}>
      <div className={styles.containerTypewriter}>
        <p className={styles.typewriter}>Cook&Eat</p>
      </div>

      <RestaurantSearchBar searchBtnClick={searchBtnClick} />

      {user && <ClientCard />}
    </div>
  );
}

export default Navbar;
