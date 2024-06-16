import fetchData from "./fetch";
import UserContext from '../context/Usercontext';
import React, { useContext } from 'react';



// Funciones para llamar a la Api

const getAllMesas = async () => {
    const { user } = useContext(UserContext);
    console.log("USER AL LLAMAR A LA API", user)

    const result = await fetchData("/mesas", "get", user);
    return result;
};

const getMesasByRestaurante = async (restauranteId) => {
    const result = await fetchData(`/mesas/restaurante/${restauranteId}`, "get");
    return result;
};

const getMesasByID = async (mesaID) => {
    const result = await fetchData(`/mesas/${mesaID}`, "get");
    return result;
};

const updateMesa = async (mesaID, mesaData) => {
    const result = await fetchData(`/mesas/${mesaID}`, "put", mesaData);
    return result;
};


const createMesa = async(mesaData)=>{
    const result = await fetchData("/mesas","post",mesaData);
    return result;
    }
    
    
const deleteMesa = async(mesaID) =>{
    const result = await fetchData(`/mesas/${mesaID}`,"delete");
    return result;
}

export {
    getAllMesas,
    getMesasByRestaurante,
    getMesasByID,
    updateMesa, 
    createMesa,
    deleteMesa
};
