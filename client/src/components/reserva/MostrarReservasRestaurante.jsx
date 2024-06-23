// mostrarReservas.jsx
import React, { useState, useContext, useEffect } from 'react';
import styles from "./MostrarReservasRestaurante.module.css"
// import ClientCard from '../../navbar/ClientCard'; // Ajusta la ruta del componente ClientCard si es necesario
import { getAllReservas } from '../../utils/reservaFetch'
import { getAllRestaurantes } from '../../utils/restauranteFetch';
import GeneralContext from '../../context/GeneralContext';



function MostrarReservasRestaurante() {

  const {reservas, restaurantes} = useContext(GeneralContext);
  
      return (
        <div className={styles.container}>
      <div className={styles.reservasContainer}>
        <h3>Reservas:</h3>   
        <ul>
          {reservas.map((reserva) => (
            <li key={reserva.Reservas_id}>
              {reserva.Name} - {reserva.Date} - {reserva.Hora_Inicio} a {reserva.Hora_Final}, estado: {reserva.Is_accepted}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


export default MostrarReservasRestaurante;
