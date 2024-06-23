import React, { useContext, useState } from 'react';
import styles from './UserCard.module.css';
import userImg from './user.png';
import GeneralContext from '../context/GeneralContext';
import ClienteReservas from '../components/reserva/clienteReservas';

function UserCard() {
  const { userName, userEmail } = useContext(GeneralContext);
  const [showReservas, setShowReservas] = useState(false);

  const toggleReservas = () => {
    setShowReservas(!showReservas);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.userAvatar}>
          <img src={userImg} alt="user avatar" />
        </div>
        <div className={styles.userDetails}>
          <p>{userName}</p>
          <p>{userEmail}</p>
          <button onClick={toggleReservas}>
            {showReservas ? 'OCULTAR MIS RESERVAS' : 'MIS RESERVAS'}
          </button>
        </div>
      </div>
      <div className={`${styles.reservasContainer} ${showReservas ? styles.show : ''}`}>
        {showReservas && <ClienteReservas />}
      </div>
    </div>
  );
}

export default UserCard;
