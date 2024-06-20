import React, { useContext } from 'react';
import styles from './Navbar.module.css';
import RestaurantSearchBar from './RestaurantSearchBar';
import ClientCard from './ClientCard';
import GeneralContext from '../context/GeneralContext.jsx'

function Navbar() {
  const { user } = useContext(GeneralContext);
  console.log("USER EN NAVBAR", user?.user_id)

  return (
    <div className={styles.containerNavbar}>
      <div className={styles.containerTypewriter}>
        <p className={styles.typewriter}>APIo</p>
      </div>

      <RestaurantSearchBar />

      {user && <ClientCard />}
    </div>
  );
}

export default Navbar;
