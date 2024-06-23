import React, { useState, useEffect, useContext } from 'react';
import GeneralContext from '../../context/GeneralContext';
import { getReservasRestaurante } from '../../utils/reservaFetch';

function MostrarReservasRestaurante() {
  const { restauranteID, setReservas, user, setRestauranteID , userIsRestaurant} = useContext(GeneralContext);
  const [reservasFiltradas, setReservasFiltradas] = useState([]);

  console.log("Componente renderizado");
  console.log("Contexto restauranteID:", restauranteID);
  console.log("Contexto user:", user);

  async function getReservas() {
    try {
      console.log("Obteniendo reservas para restauranteID:");
      const response = await getReservasRestaurante(restauranteID);
      console.log("Reservas obtenidas:", response);
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
      reserva.User_id === restauranteID && user.Restaurante_id === user // user antes user.id
    );
    setReservasFiltradas(reservasDelRestaurante);
  }

  useEffect(() => {
    if (restauranteID && user) {
      getReservas();
    }
  }, [restauranteID, user]);


  useEffect(() => {
    // Inicializar el restauranteID para PRUEBAS
    if (userIsRestaurant) {
      setRestauranteID(user);  // Establece el ID del restaurante igual al ID de usuario
    }
  }, [user, userIsRestaurant]);

  if (!restauranteID) {
    console.log("restauranteID no está definido");
  }

  if (!user) {
    console.log("user no está definido");
  }

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
