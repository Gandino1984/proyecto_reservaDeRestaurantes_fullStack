import React, { useState, useContext } from 'react';
import styles from './RestaurantSearchBar.module.css';
import GeneralContext from '../context/GeneralContext';
import { barraDeBusqueda } from '../utils/restauranteFetch'; 
import { getAllRestaurantes } from '../utils/restauranteFetch';

function RestaurantSearchBar() {

    const { restaurantData, setrestaurantData, 
            setarrayRestaurantData,
            setshowRestaurantsOpen,
            setloginFormOpen
    } = useContext(GeneralContext);
    
    console.log('SearchBar, context: restaurantData= ', restaurantData)

    const [searchTerm, setSearchTerm] = useState('');

    // const [searchResults, setSearchResults  ] = useState([]);

    const searchBarra = async (term) => {
        try {
            const response = await barraDeBusqueda(term);
        
            if (response && response.data && Array.isArray(response.data)) {
                const dataArray = response.data;
                console.log("SearchBar: DataArray= ", dataArray)
                setrestaurantData(dataArray); 
            } else {
                alert('La respuesta de la API no es válida: response = ', response)
                console.error('La respuesta de la API no es válida:', response);
            }
        } catch(error) {
                alert('Error al obtener las reservas! error = ', error)
                console.error('Error al obtener las reservas:', error);
        }
    };

    const handleInputChange = (e) => {
        setshowRestaurantsOpen(true)
        setloginFormOpen(false)
        const term = e.target.value;
        setSearchTerm(term);
        searchBarra(term);
    };

    const handleResultClick = (restaurant) => {
        setSearchTerm(restaurant.Name);
        setarrayRestaurantData([]);
    };

    const botonBusquedaHandler = (e) => {
        e.preventDefault();
        searchBarra(searchTerm);     
    };


    async function resetShowRestaurants(){
        const response = await getAllRestaurantes();

        //setarrayRestaurantData(response.data);
        setrestaurantData(response.data);
  
    }

    return (
      <div className={styles.containerSearchBar}>
            <form onSubmit={botonBusquedaHandler} className={styles.form}>
                    <div className={styles.inputContainer}>
                            <input className={styles.inputSearch} type="text" value={searchTerm} onChange={handleInputChange} name="restaurantSearch" placeholder='Busca tu restaurante'  />
                    </div>
            </form>
            <button onClick={resetShowRestaurants} type="submit" className={styles.btnTrash}>
                    <ion-icon name="trash-bin"></ion-icon>
            </button>
      </div>
    );
}

export default RestaurantSearchBar; 
