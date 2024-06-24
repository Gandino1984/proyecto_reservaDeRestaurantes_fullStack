import { useState, useContext, useRef, useEffect } from "react";
import { createReserva } from "../../utils/reservaFetch";
import styles from './reservaCliente.module.css';
import GeneralContext from "../../context/GeneralContext";

const CreateReserva = () => {
  const {
    selectedRestaurantName, 
    userLoggedOrRegistered,
    showRestaurantsOpen,
    setshowRestaurantsOpen,
    setmostrarReservasRestauranteOpen,
    reservaRestauranteExitosa,
    setreservaRestauranteExitosa,
  } = useContext(GeneralContext);

  const [Name, setName] = useState('');
  const [numGuests, setNumGuests] = useState(1);
  const [Date, setReservationDate] = useState('');
  const [Hora_Inicio, setReservationStartTime] = useState('');
  const [Hora_Final, setReservationEndTime] = useState('');
  const [error, setError] = useState(null);
  const containerRef = useRef(null);

  // Función para guardar en localStorage
  const saveToLocalStorage = () => {
    const reservaData = {
      Name,
      numGuests,
      Date,
      Hora_Inicio,
      Hora_Final,
    };
    localStorage.setItem('reservaData', JSON.stringify(reservaData));
  };

  // Función para cargar desde localStorage al montar el componente
  useEffect(() => {
    const storedData = localStorage.getItem('reservaData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setName(parsedData.Name);
      setNumGuests(parsedData.numGuests);
      setReservationDate(parsedData.Date);
      setReservationStartTime(parsedData.Hora_Inicio);
      setReservationEndTime(parsedData.Hora_Final);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!Date || !Hora_Inicio || !Hora_Final || !Name) {
      setError('Todos los campos son obligatorios!');
      return;
    }

    try {
      const data = {
        Name,
        Date,
        Hora_Inicio,
        Hora_Final,
        NumGuests: numGuests
      };
      const result = await createReserva(data);
      console.log("Resultado de la creación de reserva:", result);
      setreservaRestauranteExitosa(true);
      localStorage.removeItem('reservaData'); // Limpiar localStorage después de enviar la reserva
    } catch (err) {
      setreservaRestauranteExitosa(false);
      console.error('Error al crear la reserva:', err);
      setError('No se pudo crear la reserva. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerReservaCliente} ref={containerRef}>
        <button className={styles.closeBtn}>X</button>
        <form className="create-reserva" onSubmit={handleSubmit}>
          <div className={styles.containerInput}>
            <label htmlFor="Date">Fecha de Reserva</label>
            <input type="date" name="Date" value={Date} onChange={(e) => { setReservationDate(e.target.value); saveToLocalStorage(); }} required />
          </div>
          <div className={styles.containerInput}>
            <label htmlFor="Hora_Inicio">Hora de Inicio</label>
            <input type="time" name="Hora_Inicio" value={Hora_Inicio} onChange={(e) => { setReservationStartTime(e.target.value); saveToLocalStorage(); }} required />
          </div>
          <div className={styles.containerInput}>
            <label htmlFor="Hora_Final">Hora Final</label>
            <input type="time" name="Hora_Final" value={Hora_Final} onChange={(e) => { setReservationEndTime(e.target.value); saveToLocalStorage(); }} required />
          </div>
          <div className={styles.containerInput}>
          <label htmlFor="Name">
            {selectedRestaurantName && <input type="text" name="Name" placeholder={Name} required defaultValue={Name} />}
            {!selectedRestaurantName && <input type="text" name="Name" value={Name} placeholder="Cuál es tu nombre?" onChange={(e) => { setName(e.target.value); saveToLocalStorage(); }} required />}
            </label>
          </div>
          <button type="submit">Crear</button>
          {error && <p className="error">{error}</p>}
        </form>
      </div> 
    </div>
  );
};

export default CreateReserva;
