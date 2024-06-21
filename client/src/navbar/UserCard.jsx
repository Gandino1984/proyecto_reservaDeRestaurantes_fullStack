// clientCard.jsx
import React, { useContext } from 'react';
import styles from './UserCard.module.css';
import userImg from './user.png';
import GeneralContext from '../context/GeneralContext';

function UserCard({ onMisReservasClick }) {
  const { userName, userEmail } = useContext(GeneralContext);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.userAvatar}>
          <img src={userImg} alt="user avatar" />
        </div>
        <div className={styles.userDetails}>
          <p>{userName}</p>
          <p>{userEmail}</p>
          {/* <button onClick={onMisReservasClick}>MIS RESERVAS</button> */}
        </div>
      </div>
    </div>
  );
}

export default UserCard;
