import React, { useEffect, useState } from 'react';
import { getReservasByID, getReservasByRestaurante } from '../../utils/reservaFetch'; 
import styles from './MostrarReservasRestaurante.module.css'; 

const MostrarReservasRestaurante = ({ restauranteId }) => {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    const getReservas = async () => {
      try {
        console.log('RESERVAS:', response.data); 
        const response = await getReservasByRestaurante(restauranteId);
        if (response.data && response.data.data) {
          setReservas(response.data.data); 
        } else {
          setReservas([]); 
        }
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };

    getReservas();
  }, [restauranteId]); 

  return (
    <div className={styles.container}>
      <div className={styles.reservasContainer}>
        <h3>Reservas del Restaurante:</h3>
        {reservas.length === 0 ? (
          <p>No hay reservas para mostrar.</p>
        ) : (
          <ul>
            {reservas.map((reserva) => (
              <li key={reserva.Reservas_id}>
                {reserva.Name} - {reserva.Date} - {reserva.Hora_Inicio} a {reserva.Hora_Final}, estado: {reserva.Is_accepted ? 'Aceptado' : 'Pendiente'}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MostrarReservasRestaurante;
