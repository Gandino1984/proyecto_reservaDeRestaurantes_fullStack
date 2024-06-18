import { useContext, useState, useEffect } from "react";
import { createReserva } from "../../utils/reservaFetch";
import styles from './reservaCliente.module.css';
import GeneralContext from "../../context/GeneralContext";
import { getMesasByRestaurante } from "../../utils/mesasFetch";

const CreateReserva = ({ onCreate }) => {
  const [Name, setName] = useState('');
  const [Date, setDate] = useState('');
  const [Hora_Inicio, setHora_Inicio] = useState('');
  const [Hora_Final, setHora_Final] = useState('');
  const [selectedTableId, setSelectedTableId] = useState('');
  const [error, setError] = useState(null);
  const { restaurantData } = useContext(GeneralContext);
  const [mesasObtenidas, setMesasObtenidas] = useState([]);

  useEffect(() => {
    if (restaurantData) {
      getMesas(restaurantData.Restaurante_id);
    }
  }, [restaurantData]);

  const getMesas = async (restauranteId) => {
    try {
      const response = await getMesasByRestaurante(restauranteId);
      if (response && response.data && Array.isArray(response.data)) {
        setMesasObtenidas(response.data);
      } else {
        console.error('La respuesta de la API no es válida:', response);
        setMesasObtenidas([]);
      }
    } catch (error) {
      console.error('Error al obtener mesas:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!datePattern.test(Date)) {
      setError('La fecha debe estar en formato YYYY-MM-DD');
      return;
    }

    if (!selectedTableId) {
      setError('Por favor selecciona una mesa.');
      return;
    }

    const data = { 
      Name, 

      Date, 
      Hora_Inicio,
      Hora_Final, 
      Mesa_id: selectedTableId 
    };
    console.log("Form data", data);

    try {
      const result = await createReserva(data);
      console.log("result", result);
    } catch (err) {
      console.error('Error creando la reserva:', err);
      setError('No se pudo crear la reserva. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerReservaCliente}>
        <form className="create-reserva" onSubmit={handleSubmit}>
          <div className={styles.containerInput}>
            <input 
              type="text" 
              name="Name" 
              value={Name} 
              placeholder="Cuál es tu nombre?" 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>
{/*           <div className={styles.containerInput}>
            <label htmlFor="numGuests">Número de comensales</label>
            <input 
              type="number" 
              name="numGuests" 
              value={numGuests} 
              onChange={(e) => setNumGuests(e.target.value)} 
              min="1" 
              required 
            />
          </div> */}
          <div className={styles.containerInput}>
            <label htmlFor="Date">Fecha de la reserva</label>
            <input 
              type="date" 
              name="Date" 
              value={Date} 
              onChange={(e) => setDate(e.target.value)} 
              required 
            />
          </div>
          <div className={styles.containerInput}>
            <label htmlFor="Hora_Inicio">Hora Inicio</label>
            <input 
              type="time" 
              name="Hora_Inicio" 
              value={Hora_Inicio} 
              onChange={(e) => setHora_Inicio(e.target.value)} 
              required 
            />
          </div>

          <div className={styles.containerInput}>
            <label htmlFor="Hora_Final">Hora Final</label>
            <input 
              type="time" 
              name="Hora_Final" 
              value={Hora_Final} 
              onChange={(e) => setHora_Final(e.target.value)} 
              required 
            />
          </div>
          <div className={styles.containerInput}>
            <label htmlFor="selectedTable">Selecciona una mesa</label>
            {mesasObtenidas.length > 0 ? (
              <select 
                name="selectedTable" 
                value={selectedTableId} 
                onChange={(e) => setSelectedTableId(e.target.value)} 
                required
              >
                <option value="">Selecciona una mesa</option>
                {mesasObtenidas.map(mesa => (
                  <option key={mesa.Mesa_id} value={mesa.Mesa_id}>
                    Mesa {mesa.Mesa_id} - {mesa.Sillas} sillas
                  </option>
                ))}
              </select>
            ) : (
              <p>No hay mesas disponibles para este restaurante.</p>
            )}
          </div>
          <button type="submit">Crear</button>
          {error && <p className="error">{error}</p>}
        </form>
      </div> 
    </div>
  );
};

export default CreateReserva;
