import React, { useContext, useState, useEffect } from 'react';
import styles from './TarjetasRestaurante.module.css';

import UserContext from "../../context/Usercontext"

import { getAllReservas } from '../../utils/reservaFetch';
import { getAllRestaurantes } from '../../utils/restauranteFetch';
import { getMesasByRestaurante } from "../../utils/mesasFetch"

function TarjetasRestaurante() {
  const { user } = useContext(UserContext);
  const [reservas, setReservas] = useState([]);
  const [mesas, setmesas] = useState([]);

  const [restaurantes, setRestaurantes] = useState([]);

  useEffect(() => {
    const fetchRestaurantes = async () => {
      try {
        const data = await getAllRestaurantes();
        setRestaurantes(data);
      } catch (error) {
        console.error('Error al obtener los restaurantes:', error);
      }
    };
    fetchRestaurantes();
  }, []);

  const handleMisReservasClick = async (restauranteId) => {
    try {
      const data = await getMesasByRestaurante(restaurantes.restauranteId);
      setmesas(data);
    } catch (error) {
      console.error('Error al obtener las reservas:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.restaurantesContainer}>
        <h3>Restaurantes:</h3>
        <ul>
          {restaurantes.map((restaurante) => (
            <li key={restaurante.Restaurante_id}>
              <div className={styles.restauranteCard}>
                <h4>{restaurante.Name}</h4>
                <p>Tipo: {restaurante.Tipo_Restaurante}</p>
                <p>Hora de Apertura: {restaurante.Hora_Apertura}</p>
                <p>Hora de Cierre: {restaurante.Hora_Cierre}</p>
                <button onClick={() => handleMisReservasClick(restaurante.Restaurante_id)}>VER RESERVAS</button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.reservasContainer}>
        <h3>Reservas:</h3>
        <ul>
          {reservas.map((reserva) => (
            <li key={reserva.Reservas_id}>
              {reserva.Name} - {reserva.Date} - {reserva.Hora_Inicio} a {reserva.Hora_Final}, estado: {reserva.Is_Accepted ? 'Aceptada' : 'Pendiente'}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TarjetasRestaurante;
