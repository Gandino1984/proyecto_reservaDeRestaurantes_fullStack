import React, { useContext, useEffect, useState } from 'react';
import GeneralContext from '../../context/GeneralContext';
import { getAllReservas } from '../../utils/reservaFetch';
/* import "./clienteReservas.modules.css"; */
const ClienteReservas = () => {
  const { 
    user,
    userIsClient,
    setReservas,
    reservas
  } = useContext(GeneralContext);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservas = async () => {
      if (user) {
        try {
          setLoading(true);
          const data = await getAllReservas();
          setReservas(Array.isArray(data) ? data : []);
          setLoading(false);
        } catch (err) {
          console.error('Error al obtener las reservas:', err);
          setError('Error al cargar las reservas. Por favor, intenta de nuevo.');
          setLoading(false);
        }
      }
    };

    fetchReservas();
  }, [user, setReservas]);

  if (!userIsClient) return null;
  if (loading) return <p>Cargando reservas...</p>;
  if (error) return <p>{error}</p>;

  // Asegúrate de que reservas es un array antes de usar map
  const reservasArray = Array.isArray(reservas) ? reservas : [];

  return (
    <div>
      <h2>Mis Reservas</h2>
      {reservasArray.length === 0 ? (
        <p>No tienes reservas activas.</p>
      ) : (
        <ul>
          {reservasArray.map((reserva) => (
            <li key={reserva.Reservas_id}>
              <p>Fecha: {new Date(reserva.Date).toLocaleDateString()}</p>
              <p>Hora inicio: {reserva.Hora_Inicio}</p>
              <p>Hora final: {reserva.Hora_Final}</p>
              <p>Estado: {reserva.Is_Accepted ? 'Aceptada' : 'Pendiente'}</p>
              <p>Mesa: {reserva.Mesa_id}</p>
              <p>Nombre: {reserva.Name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClienteReservas;