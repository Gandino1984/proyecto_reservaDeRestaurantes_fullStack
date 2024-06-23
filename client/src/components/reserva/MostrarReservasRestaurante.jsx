import React, { useState, useEffect, useContext } from 'react';
import GeneralContext from '../../context/GeneralContext';
import { getAllReservasRestaurante } from '../../utils/reservaFetch';

function MostrarReservasRestaurante() {
  const { restauranteID, setReservas, user } = useContext(GeneralContext);
  const [reservasFiltradas, setReservasFiltradas] = useState([]);

  async function getReservas() {
    try {
      const response = await getAllReservasRestaurante();
      if (response && response.data) {
        setReservas(response.data);
        filtrarReservas(response.data);
      }
    } catch (error) {
      console.error("Error al mostrar reservas:", error);
    }
  }

  function filtrarReservas(todasLasReservas) {
    const reservasDelRestaurante = todasLasReservas.filter(reserva => 
      reserva.User_id === user.id && user.Restaurante_id === restauranteID
    );
    setReservasFiltradas(reservasDelRestaurante);
  }

  useEffect(() => {
    if (restauranteID && user) {
      getReservas();
    }
  }, [restauranteID, user]);

  return (
    <div>
      <h2>Reservas Restaurante</h2>
      <ul className='reservas-list'>
        {reservasFiltradas.map(reserva => (
          <li key={reserva.Reservas_id} className='card'>
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
        ))}
      </ul>
    </div>
  );
}

export default MostrarReservasRestaurante;


/* import React, { useState, useEffect, useContext } from 'react';
import GeneralContext from '../../context/GeneralContext';
import { getAllReservasRestaurante } from '../../utils/reservaFetch';

function MostrarReservasRestaurante() {
  const { restauranteID, reservas, setReservas, usuarioId } = useContext(GeneralContext);
  const [reservaID, setReservaID] = useState(null);
  const [reservasArray, setReservasArray] = useState([]);
  console.log('reservasArray, Context: reservasData= ', setReservaID);

  async function getReservas() {
    try {
      const response = await getAllReservasRestaurante(restauranteID);
      if (response && response.data) {
        const todasLasReservas = response.data.flatMap(user => user.reservas);
        setReservas(todasLasReservas);
        console.log("Reservas obtenidas:", todasLasReservas);
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
    if (reservas && reservaID) {
      const reservaEspecifica = reservas.find(reserva => reserva.id === reservaID && reserva.usuarioId === usuarioId);
      if (reservaEspecifica) {
        setReservasArray([reservaEspecifica]);
      } else {
        setReservasArray([]);
      }
    }
  }, [reservas, reservaID, usuarioId]);

  return (
    <div>
      <h2>Reservas Restaurante</h2>
      <ul className='reservas-list'>
        {reservasArray.map(reserva => (
          <li key={reserva.id} className='card'>
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
        ))}
      </ul>
    </div>
  );
}

export default MostrarReservasRestaurante;
 */