import React, { useContext } from 'react';
import styles from './ClientCard.module.css';
import userImg from './user.png';
import UserContext from '../context/Usercontext';

function ClientCard() {
  const { user } = useContext(UserContext);
  console.log("USER EN CLIENTCARD", user)

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.userAvatar}>
          <img src={userImg} alt="user avatar" />
        </div>
        <div className={styles.userDetails}>
          <p>{user.name}</p>
          <p>{user.email}</p>
          <button>MIS RESERVAS</button>
        </div>
      </div>
    </div>
  );
}

export default ClientCard;
