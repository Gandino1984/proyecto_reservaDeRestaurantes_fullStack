import fetchData from "./fetch.js";
import UserContext from '../context/Usercontext';
import React, { useContext } from 'react';

//IMPORTANTE, LA FUNCION getAllReservas MIRA SI ES ADMIN O NO
//SI ES ADMIN SACA TODAS LAS RESERVAS
//PERO SI ES USER SACA LAS RESERVAS ASOCIADAS AL USER_ID DEL QUE ESTA LOGUADO
const getAllReservas = async () => {
    try {
        const result = await fetchData("/reservas", "get",);
        return result;
    } catch (error) {
        console.error(error);
    }   
};
  

const getReservasPorDiaYSillas = async (restauranteID, numeroSillas, dia ) => {
    const result = await fetchData(`${restauranteID}/${numeroSillas}/${dia}`, "get");
    return result;
};

const getReservasByID = async (reservaID) => {
    const result = await fetchData(`/reservas/${reservaID}`, "get");
    return result;
};

const updateReserva = async (reservaID, reservaData) => {
    const result = await fetchData(`/reservas/${reservaID}`, "put", reservaData);
    return result;
};


const createReserva = async(reservaData)=>{
    const result = await fetchData("/reservas","post",reservaData);
    return result;
    }
    
    
const deleteReserva = async(reservaID) =>{
    const result = await fetchData(`/reservas/${reservaID}`,"delete");
    console.log(result);
    return result;
}

export {
    getAllReservas,
    getReservasPorDiaYSillas,
    getReservasByID,
    updateReserva, 
    createReserva,
    deleteReserva
};
