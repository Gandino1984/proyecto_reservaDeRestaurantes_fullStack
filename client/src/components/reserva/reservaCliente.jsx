import { useState } from "react";
import { createReserva } from "../../utils/reservaFetch";
import styles from './reservaCliente.module.css'

const CreateReserva = ({ onCreate }) => {
  const [name, setName] = useState('');
  const [numGuests, setNumGuests] = useState(1);
  const [reservationDate, setReservationDate] = useState('');
  const [reservationTime, setReservationTime] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setError(null); 

    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!datePattern.test(reservationDate)) {
      setError('La fecha debe estar en formato YYYY-MM-DD');
      return;
    }

    const data = { name, numGuests, reservationDate, reservationTime };
    console.log("Form data", data);

    try {
      const result = await createReserva(data);
      console.log("result", result);
      onCreate();
    } catch (err) {
      console.error('Error creating reservation:', err);
      setError('Failed to create reservation. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerReservaCliente}>
          <form className="create-reserva" onSubmit={handleSubmit}>
              <div className={styles.containerInput}>
                <input type="text" name="name" value={name} placeholder="Cuál es tu nombre?" onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className={styles.containerInput}>
                <label htmlFor="numGuests">Guests Number</label>
                <input type="number" name="numGuests" value={numGuests} onChange={(e) => setNumGuests(e.target.value)} min="1" required />
              </div>
              <div className={styles.containerInput}>
                <label htmlFor="reservationDate">Reservation Date</label>
                <input type="date" name="reservationDate" value={reservationDate} onChange={(e) => setReservationDate(e.target.value)} required />
              </div>
              <div className={styles.containerInput}>
                <label htmlFor="reservationTime">Hour</label>
                <input type="time" name="reservationTime" value={reservationTime} onChange={(e) => setReservationTime(e.target.value)} required />
              </div>
              <button type="submit">Create</button>
              {error && <p className="error">{error}</p>}
          </form>
      </div> 
    </div>
  );
};

export default CreateReserva;