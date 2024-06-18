import React, { useState, useContext } from 'react';
import styles from './RestaurantSearchBar.module.css';
import GeneralContext from '../context/GeneralContext';
import { barraDeBusqueda } from '../utils/restauranteFetch'; 

function RestaurantSearchBar({ searchBtnClick }) {
  const { setrestaurantData } = useContext(GeneralContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const searchBarra = async (term) => {
    try {
      console.log('Buscando:', term); // Para depuración
      const response = await barraDeBusqueda(term);
      console.log('Datos recibidos:', response); // Para depuración
  
      if (response && response.data && Array.isArray(response.data)) {
        // Si la respuesta tiene la estructura esperada
        const dataArray = response.data;
        setrestaurantData(dataArray); // Actualizar el contexto si es necesario
        setSearchResults(dataArray); // Actualizar resultados de búsqueda
        console.log("resultados busqueda", dataArray); // Para depuración
      } else {
        console.error('La respuesta de la API no es válida:', response);
        setSearchResults([]); // Limpiar resultados en caso de respuesta inválida
      }
    } catch (error) {
      console.error('Error al obtener las reservas:', error);
      setSearchResults([]); // Limpiar resultados en caso de error
    }
  };

  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term.length > 2) {
      searchBarra(term);
    } else {
      setSearchResults([]);
    }
  };

  const handleResultClick = (restaurant) => {
    setSearchTerm(restaurant.Name);
    setSearchResults([]);
  };

  const botonBusquedaHandler = (e) => {
    e.preventDefault();
    if (searchTerm.length > 2) {
      searchBarra(searchTerm);
    }
    searchBtnClick(e);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={botonBusquedaHandler} className={styles.form}>
        <div className={styles.inputContainer}>
          <input
            className={styles.inputSearch}
            type="text"
            name="restaurantSearch"
            placeholder='Buscar un restaurante'
            value={searchTerm}
            onChange={handleInputChange}
          />
          {searchResults.length > 0 && (
            <div className={styles.dropdown}>
              {searchResults.map((restaurant) => (
                <div 
                  key={restaurant.Restaurante_id} 
                  className={styles.searchResultItem}
                  onClick={() => handleResultClick(restaurant)}
                >
                  <p>{restaurant.Name}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <button type="submit" className={styles.btnSearch}>
          <ion-icon name="search"></ion-icon>
        </button>
      </form>
    </div>
  );
}

export default RestaurantSearchBar;
