import fetchData from "fetch.js";

// Funciones para llamar a la Api

const getAllRestaurantes = async () => {
    const result = await fetchData("/restaurantes", "get");
    return result;
};


const getRestauranteByID = async (restauranteID) => {
    const result = await fetchData(`/restaurantes/${restauranteID}`, "get");
    return result;
};

const updateRestaurante = async (restauranteID, restauranteData) => {
    const result = await fetchData(`/restaurantes/${restauranteID}`, "put", restauranteData);
    return result;
};


const createRestaurante = async(restauranteData)=>{
    const result = await fetchData("/restaurantes","post",restauranteData);
    return result;
    }
    
    
const removeRestaurante = async(restauranteID) =>{
    const result = await fetchData("/restaurantes/"+restauranteID,"delete");
    console.log(result);
    return result;
}

export {
    getAllRestaurantes,
    getRestauranteByID,
    updateRestaurante, 
    createRestaurante,
    removeRestaurante
};
