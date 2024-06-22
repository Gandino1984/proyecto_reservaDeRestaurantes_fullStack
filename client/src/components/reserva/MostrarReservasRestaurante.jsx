import React, { useContext, useEffect, useState } from 'react';
import styles from './MostrarReservasRestaurante.module.css';
import GeneralContext from '../../context/GeneralContext';

const MostrarReservasRestaurante = ({ restauranteId }) => {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
      const getReservas = async () => {
          try {
              const result = await getReservasByRestaurante(restauranteId);
              setReservas(result.data);
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
        {reservasDelRestaurante.length === 0 ? (
          <p>No hay reservas para mostrar.</p>
        ) : (
          <ul>
            {reservasDelRestaurante.map((reserva) => (
              <li key={reserva.Reservas_id}>
                {reserva.Name} - {reserva.Date} - {reserva.Hora_Inicio} a {reserva.Hora_Final}, estado: {reserva.Is_accepted ? 'Aceptado' : 'Pendiente'}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default MostrarReservasRestaurante;
