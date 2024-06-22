import React, { useState, useEffect, useContext } from 'react';
import GeneralContext from '../../context/GeneralContext';
import { getAllReservasRestaurante } from '../../utils/reservaFetch';
/* import './MostrarReservasRestaurante.css'; */

function MostrarReservasRestaurante() {
  const { restauranteID, reservas, setReservas, usuarioID } = useContext(GeneralContext);
  const [reservasArray, setReservasArray] = useState([]);

  async function getReservas() {
    try {
      const response = await getAllReservasRestaurante(restauranteID);
      if (response && response.data) {
        const todasLasReservas = response.data.flatMap(mesa => mesa.reservas);
        setReservas(todasLasReservas);
        console.log("response.data= ", response.data);
      }
    } catch (error) {
      console.error("Error al mostrar reservas:", error);
    }
  }

  useEffect(() => {
    if (restauranteID) {
      getReservas();
    }
  }, [restauranteID]);

  useEffect(() => {
    if (reservas) {
      const reservasFiltradas = reservas.filter(reserva => reserva.usuarioID === usuarioID);
      const reservasMapped = reservasFiltradas.map((reserva, index) => 
        <li key={index} className='card'>
          <h3>Reserva #{reserva.Reservas_id}</h3>
          <div className='cardDetails'>
            <h5>Cliente: {reserva.Name}</h5>
            <h5>Fecha: {new Date(reserva.Date).toLocaleDateString()}</h5>
            <h5>Hora de Inicio: {reserva.Hora_Inicio}</h5>
            <h5>Hora de Final: {reserva.Hora_Final}</h5>
            <h5>Estado: {reserva.Is_accepted ? 'Aceptada' : 'Pendiente'}</h5>
            <h5>Mesa: {reserva.Mesa_id}</h5>
          </div>
        </li>
      );
      setReservasArray(reservasMapped);
    }
  }, [reservas, usuarioID]);

  return (
    <div>
      <h2>Reservas del Restaurante</h2>
      <ul className='reservas-list'>
        {reservasArray}
      </ul>
    </div>
  );
}

export default MostrarReservasRestaurante;
