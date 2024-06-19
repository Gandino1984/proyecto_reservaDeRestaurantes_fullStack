// mostrarReservas.jsx
import React, { useContext, useState, useEffect } from 'react';
import styles from "./MostrarReservasRestaurante.module.css"
import ClientCard from '../../navbar/ClientCard'; // Ajusta la ruta del componente ClientCard si es necesario
import { getAllReservas, updateReserva, getReservasByID, getReservasByRestaurante } from '../../utils/reservaFetch';
import GeneralContext from '../../context/GeneralContext';

function MostrarReservasRestaurante() {
  const [reservas, setReservas] = useState([]);
  const [Reservas_id, setReservas_id]= useState('');
  const {restaurantData,userIsRestaurant} = useContext(GeneralContext);
  const [reservasObtenidas, setReservasObtenidas] = useState([]);
  const [error, setError] = useState(null);
  

  console.log("restaurandData",restaurantData,userIsRestaurant)
  useEffect(() => {
    if (restaurantData && userIsRestaurant) {
      getReservas(restaurantData.Restaurante_id);
    }
  }, [restaurantData, userIsRestaurant]);

  const getReservas = async (restauranteId) => {
    try {
      const response = await getReservasByRestaurante(restauranteId);
      console.log("response reservas",response)
      if (response && response.data){
        setReservas(response.data);

      } else {
        console.error('La respuesta de la API no es válida:', response);
        setReservas([]);
      }
      
    } catch (error) {
      console.error('Error al obtener reservas:', error);
      setError('No hay reserbas todavía.')      
    }
  };


  const handleAceptarReserva = async (Reservas_id) => {
    try {
      await updateReserva(Reservas_id,{ Is_accepted: false });
      getReservas(restaurantData.Restaurante_id);

    } catch (error) {
      console.error('Error al aceptar la reserva', error);
      setError('No se ha podio aceptar la reserva. Por favor, inténtalo de nuevo.')
      
    }
  };

  const handleRechazarReserva = async (Reservas_id) => {
    try {
      await updateReserva(Reservas_id,{ Is_accepted: true });
      getReservas(restaurantData.Restaurante_id);

    } catch (error) {
      console.error('Error al rechazar la reserva', error);
      setError('No se ha podido rechazar la reserva. Por favor, inténtalo de nuevo.')
      
    }
  };

  if(!userIsRestaurant){

    return null;
  }

/*   const handleMisReservasClick = async () => {
    e.preventDefault();
    setError(null);

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
  }; */

  return (
    <div className={styles.container}>
      <ClientCard onMisReservasClick={getReservas(restaurantData.Restaurante_id)} />
      <div className={styles.reservasContainer}>
        <h3>Reservas:</h3>
        {error && <p className="error">{error}</p>}
        <ul>
          {reservas.map((reserva) => (
            <li key={reserva.Reservas_id}>
              {reserva.Name} - {reserva.Date} - {reserva.Hora_Inicio} a {reserva.Hora_Final}, estado: {reserva.Is_accepted}
              <button onClick={()=> handleAceptarReserva(reserva.Reservas_id)}>Aceptar</button>
              <button onClick={()=> handleRechazarReserva(reserva.Reservas_id)}>Rechazar</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MostrarReservasRestaurante;
