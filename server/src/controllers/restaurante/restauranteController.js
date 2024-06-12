import restauranteModel from "../../models/restauranteModel.js";
import { Op } from 'sequelize'; 


async function getAll(userData) {
    try {
        if (userData.esAdmin == 1) {
            const users = await restauranteModel.findAll();
            console.log("LAS restaurante MOSTRADAS SIENDO ADMIN SON:", users)
            return { data: users };
        }
        if (userData.esAdmin == 0) {
            const user = await restauranteModel.findOne({ where: { User_id: userData.user_id } });
            console.log("LAS restaurante MOSTRADAS SIENDO USUARIO SON:", user)
            return { data: [user] };
        }        
    }
    catch (error) {
        console.error(error);
        return { error: error };
    }
}

const getByProperty = async(property,value) =>{
    try {
        const restaurante = await restauranteModel.find({[property]:value})
        return restaurante;
    } catch (error) {
        return null;
    }
}

async function getById(id) {
    try {
        const restaurante = await restauranteModel.findByPk(id);
        if (!restaurante) {
            return { error: "El restaurante no existe" };
        }
        return { data: restaurante };
    }
    catch (error) {
        console.error(error);
        return { error };
    }

}

async function update(id, restauranteData) {
    const {Name, Hora_Apertura, Hora_Cierre} = restauranteData;
    try {
        // Crear el objeto de usuario actualizado
        const nuevorestaurante = {};
        if (Name) nuevorestaurante.Name = Name;
        if (Hora_Apertura) nuevorestaurante.Hora_Apertura = Hora_Apertura;
        if (Hora_Cierre) nuevorestaurante.Hora_Cierre = Hora_Cierre;

        // Verificar si hay campos para actualizar
        if (Object.keys(nuevorestaurante).length === 0) {
            return {error: "No hay campos válidos para actualizar."};
        }
        // Realizar la actualización
        const restaurante = await restauranteModel.update(nuevorestaurante, {where: {restaurante_id: id}});

        return {restaurante, nuevorestaurante};
    } catch (error) {
        console.log("ERROR ES:", error);
        return {error};
    }
}

async function create(restauranteData, id) {
    const { Restaurante_id, Sillas } = restauranteData;

    // Validaciones básicas
    if (!Restaurante_id || !Sillas) {
        return { error: "Todos los campos son obligatorios" };
    }
    const maxIdResult = await restauranteModel.findOne({attributes: ['restaurante_id'], order: [['restaurante_id', 'DESC']]});
    console.log("EL ID MAXIMO ES:",maxIdResult)

    let maxrestauranteId = null;
    
    if (maxIdResult) {
        maxrestauranteId = maxIdResult.dataValues.restaurante_id +1;
    }
    const sessionUserId = id

        try {
            const newrestaurante = await restauranteModel.create({
                Restaurante_id:1,
                Sillas,
            });
            console.log("new restaurante", newrestaurante);
            return { data: newrestaurante };

        } catch (error) {

            console.error("Error al crear la restaurante:", error);
            return { error: "Error al crear la restaurante. Por favor, inténtelo de nuevo más tarde." };
        }

}


async function remove(id) {
    try {
        const restaurante = await restauranteModel.findByPk(id);
        await restaurante.destroy();
        return {data:restaurante};
    } catch (error) {
        console.error(error);
        return{error}
    }
    
}

export {
    getAll,
    getById,
    getByProperty,
    create,
    update,
    remove
};


export default {
    getAll,
    getById,
    getByProperty,
    create,
    update,
    remove
};