// mostrarReservas.jsx
import React, { useState, useContext, useEffect } from 'react';
import styles from "./MostrarReservasRestaurante.module.css"
import ClientCard from '../../navbar/ClientCard'; // Ajusta la ruta del componente ClientCard si es necesario
import { getAllReservas } from '../../utils/reservaFetch'
import GeneralContext from '../../context/GeneralContext';



function MostrarReservasRestaurante() {

  const {reservas, setReservas} = useContext(GeneralContext);

  useEffect(() => {
    handleMisReservasClick();
  }, [reservas]);

  const handleMisReservasClick = async () => {
    try {
      const response = await getAllReservas();
      const data = response.data;

      if (Array.isArray(data)) { // Verifica que la respuesta sea un array
        setReservas(data);
      } else {
        console.error('La respuesta de la API no contiene un array:', response);
      }
    } catch (error) {
      console.error('Error al obtener las reservas:', error);
    }


  return (
    <div className={styles.container}>
      {/* <ClientCard onMisReservasClick={handleMisReservasClick} /> */}
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

}

export default MostrarReservasRestaurante;
