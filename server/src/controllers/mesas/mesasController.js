import mesasModel from "../../models/mesasModel.js";
import { Op } from 'sequelize'; 


async function getAll(userData) {
    try {
        if (userData.esAdmin == 1) {
            const users = await mesasModel.findAll();
            console.log("LAS mesaS MOSTRADAS SIENDO ADMIN SON:", users)
            return { data: users };
        }
        if (userData.esAdmin == 0) {
            const user = await mesasModel.findOne({ where: { User_id: userData.user_id } });
            console.log("LAS mesaS MOSTRADAS SIENDO USUARIO SON:", user)
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
        const mesa = await mesasModel.find({[property]:value})
        return mesa;
    } catch (error) {
        return null;
    }
}

async function getById(id) {
    try {
        const mesa = await mesasModel.findByPk(id);
        if (!mesa) {
            return { error: "El mesa no existe" };
        }
        return mesa ;
    }
    catch (error) {
        console.error(error);
        return { error };
    }

}

async function update(id, mesaData) {
    const {Sillas} = mesaData;
    try {
        // Crear el objeto de usuario actualizado
        const nuevomesa = {};
        if (Sillas) nuevomesa.Sillas = Sillas;

        // Verificar si hay campos para actualizar
        if (Object.keys(nuevomesa).length === 0) {
            return {error: "No hay campos válidos para actualizar."};
        }
        // Realizar la actualización
        const mesa = await mesasModel.update(nuevomesa, {where: {mesa_id: id}});

        return {mesa, nuevomesa};
    } catch (error) {
        console.log("ERROR ES:", error);
        return {error};
    }
}

async function create(mesaData, id) {
    const { Restaurante_id, Sillas } = mesaData;

    // Validaciones básicas
    if (!Restaurante_id || !Sillas) {
        return { error: "Todos los campos son obligatorios" };
    }
    const maxIdResult = await mesasModel.findOne({attributes: ['Mesa_id'], order: [['Mesa_id', 'DESC']]});
    console.log("EL ID MAXIMO ES:",maxIdResult)

    let maxmesaId = null;
    
    if (maxIdResult) {
        maxmesaId = maxIdResult.dataValues.Mesa_id +1;
    }

        try {
            const newmesa = await mesasModel.create({
                Mesa_id:maxmesaId,
                Restaurante_id:1,
                Sillas,
            });
            console.log("new mesa", newmesa);
            return { data: newmesa };

        } catch (error) {

            console.error("Error al crear la mesa:", error);
            return { error: "Error al crear la mesa. Por favor, inténtelo de nuevo más tarde." };
        }

}


async function remove(id) {
    try {
        const mesa = await mesasModel.findByPk(id);
        await mesa.destroy();
        return {data:mesa};
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