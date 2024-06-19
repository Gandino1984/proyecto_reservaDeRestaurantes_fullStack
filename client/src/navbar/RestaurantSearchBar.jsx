import React, { useState, useContext } from 'react';
import styles from './RestaurantSearchBar.module.css';
import GeneralContext from '../context/GeneralContext';
import { barraDeBusqueda } from '../utils/restauranteFetch'; 

function RestaurantSearchBar() {

    const { restaurantData, setrestaurantData, setcreateReservasOpen, userLoggedOrRegistered, setuserLoggedOrRegistered, arrayRestaurantData,setarrayRestaurantData
    } = useContext(GeneralContext);
    
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults  ] = useState([]);

    const searchBarra = async (term) => {
        try {
            const response = await barraDeBusqueda(term);
        
            if (response && response.data && Array.isArray(response.data)) {
                const dataArray = response.data;
                console.log("SearchBar: DataArray= ", dataArray)
                setrestaurantData(dataArray); 
                setSearchResults(dataArray);
            } else {
                console.error('La respuesta de la API no es válida:', response);
                setarrayRestaurantData([]); 
            }
        } catch(error) {
              console.error('Error al obtener las reservas:', error);
              setarrayRestaurantData([]); 
        }
    };

    const handleInputChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        
        if (term.length > 2) {
            searchBarra(term);
        } else {
          setarrayRestaurantData([]);
        }
    };

    const handleResultClick = (restaurant) => {
        setSearchTerm(restaurant.Name);
        setarrayRestaurantData([]);
        // abrir aquí el componente de login o reserva
    };

    const botonBusquedaHandler = (e) => {
        e.preventDefault();
        if (searchTerm.length > 2) {
            searchBarra(searchTerm);
        }
    };

    // function searchBtnhandler(e) {
    //     e.preventDefault();
    //     if(userLoggedOrRegistered){
    //       setcreateReservasOpen(true)
    //     }
    // }   

    async function resetShowRestaurants(){
        const response = await getAllRestaurantes();
        setarrayRestaurantData(response.data);
    }

    return (
      <div className={styles.container}>
          {/* <button onClick={searchBtnhandler} type="submit" className={styles.btnSearch}>
                <ion-icon name="search"></ion-icon>
          </button> */}

          <form onSubmit={botonBusquedaHandler} className={styles.form}>
            <div className={styles.inputContainer}>
                <input className={styles.inputSearch} type="text" name="restaurantSearch" placeholder='Buscar un restaurante' value={searchTerm} onChange={handleInputChange} />
{/* 
                {searchResults.length > 0 && (
                    <div className={styles.dropdown}>
                        {searchResults.map((restaurant) => (
                            <div key={restaurant.Restaurante_id} className={styles.searchResultItem} onClick={() => handleResultClick(restaurant)}>
                                <p>{restaurant.Name}</p>
                            </div>
                        ))}
                    </div>
                )} */}
            </div>
          </form>

          <button onClick={resetShowRestaurants} type="submit" className={styles.btnSearch}>
              <ion-icon name="list-outline"></ion-icon>
          </button>
      </div>
    );
}

export default RestaurantSearchBar; 
