// ClientCard.jsx

import React, { useContext, useState } from 'react';
import styles from './ClientCard.module.css';
import userImg from './user.png';
import UserContext from '../context/Usercontext';
import { getAllReservas } from '../utils/reservaFetch';

function ClientCard() {
  const { user } = useContext(UserContext);
  const [reservas, setReservas] = useState([]);

  const handleMisReservasClick = async () => {
    try {
      const data = await getAllReservas(user.user_id);
      setReservas(data);
    } catch (error) {
      console.error('Error al obtener las reservas:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.userAvatar}>
          <img src={userImg} alt="user avatar" />
        </div>
        <div className={styles.userDetails}>
          <p>{user.name}</p>
          <p>{user.email}</p>
          <button onClick={handleMisReservasClick}>MIS RESERVAS</button>
        </div>
      </div>
      <div className={styles.reservasContainer}>
        <h3>Reservas:</h3>
        <ul>
          {reservas.map((reserva) => (
            <li key={reserva.Reservas_id}>
              {reserva.Name} - {reserva.Date} - {reserva.Hora_Inicio} a {reserva.Hora_Final}, estado: {reserva.Is_Accepted}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ClientCard;
