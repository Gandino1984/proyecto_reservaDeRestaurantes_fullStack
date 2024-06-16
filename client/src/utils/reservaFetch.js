import fetchData from "fetch.js";

// Funciones para llamar a la Api

const getAllReservas = async () => {
    const result = await fetchData("/reservas", "get");
    return result;
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
