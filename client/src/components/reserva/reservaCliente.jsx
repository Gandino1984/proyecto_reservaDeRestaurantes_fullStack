import { useState, useContext, useRef, useEffect } from "react";
import { createReserva } from "../../utils/reservaFetch";
import styles from './reservaCliente.module.css'
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
    reservasFalsas,
    setreservasFalsas 
  } = useContext(GeneralContext);

  const [name, setName] = useState('');
  const [numGuests, setNumGuests] = useState(1);
  const [date, setdate] = useState('');
  const [initialTime, setinitialTime] = useState('');
  const [finalTime, setfinalTime] = useState('');
  const [error, setError] = useState(null);
  const containerRef = useRef(null); // container para despues cerrar

  useEffect(() => {
    if(selectedRestaurantName && userLoggedOrRegistered){
      setName(selectedRestaurantName)
      setshowRestaurantsOpen(false);
    }
  },[]);

  let reservasFake = [];

  function agregarReservaCliente(arreglo, dataReserva){
    arreglo.push(dataReserva);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    
    if (!datePattern.test(date)) {
      setError('La fecha debe estar en formato YYYY-MM-DD');
      return;
    }

    const data = { date, initialTime, finalTime, name };

    try {
        agregarReservaCliente(reservasFake, data)
        
        for(let i = 0; i < reservasFake.length; i++){
            console.log("reservasFake[i]= ", reservasFake[i]);
        }
        // const result = await createReserva(data);
        // console.log("!!!!!!!!!!!RESULT", result);  
        setreservaRestauranteExitosa(true);
    } catch (err) {
        setreservaRestauranteExitosa(false);
        // console.error('Error creating reservation:', err);
        // setError('Failed to create reservation. Please try again.');
    }
  };  

  function onClickReservaClienteHandler() {
    if (reservaRestauranteExitosa) {
      setmostrarReservasRestauranteOpen(true);    
      alert("reserva exitosa. mostrarReservasRestauranteOpen=true");
    } else {
      alert("reserva fallida. mostrarReservasRestauranteOpen=false");
      setmostrarReservasRestauranteOpen(false);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.containerReservaCliente} ref={containerRef}>
        <button className={styles.closeBtn}>X</button>
        <form className="create-reserva" onSubmit={handleSubmit}>
          <div className={styles.containerInput}>
          {selectedRestaurantName && <p>{selectedRestaurantName}</p>}
            {/* {selectedRestaurantName && <input type="text" name="name" placeholder={name} required defaultValue={name}/>} */}
            {!selectedRestaurantName && <input type="text" name="name" value={name} placeholder="Cuál es tu nombre?" onChange={(e) => setName(e.target.value)} required />}
          </div>
          
          <div className={styles.containerInput}>
            <label htmlFor="numGuests">Guests Number</label>
            <input type="number" name="numGuests" value={numGuests} onChange={(e) => setNumGuests(e.target.value)} min="1" required />
          </div>
          
          <div className={styles.containerInput}>
            <label htmlFor="date">Reservation Date</label>
            <input type="date" name="date" value={date} onChange={(e) => setdate(e.target.value)} required />
          </div>
          
          <div className={styles.containerInput}>
            <label htmlFor="initialTime">Initial Hour</label>
            <input type="time" name="initialTime" value={initialTime} onChange={(e) => setinitialTime(e.target.value)} required />
          </div>
          <div className={styles.containerInput}>
            <label htmlFor="finalTime">Final Hour</label>
            <input type="time" name="finalTime" value={finalTime} onChange={(e) => setfinalTime(e.target.value)} required />
          </div>
          <button onClick={onClickReservaClienteHandler} type="submit">Create</button>
          {error && <p className="error">{error}</p>}
        </form>
      </div> 
    </div>
  );
};

export default CreateReserva;
