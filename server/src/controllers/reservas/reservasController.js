import ReservasModel from "../../models/ReservasModel.js";
import { Op } from 'sequelize'; 


async function getAll(userData) {
    try {
        if (userData.esAdmin == 1) {
            const users = await ReservasModel.findAll();
            console.log("LAS RESERVAS MOSTRADAS SIENDO ADMIN SON:", users)
            return { data: users };
        }
        if (userData.esAdmin == 0) {
            const user = await ReservasModel.findOne({ where: { User_id: userData.user_id } });
            console.log("LAS RESERVAS MOSTRADAS SIENDO USUARIO SON:", user)
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
        const reserva = await ReservasModel.find({[property]:value})
        return reserva;
    } catch (error) {
        return null;
    }
}

async function getById(id) {
    try {
        const reserva = await ReservasModel.findByPk(id);
        if (!reserva) {
            return { error: "El reserva no existe" };
        }
        return { data: reserva };
    }
    catch (error) {
        console.error(error);
        return { error };
    }

}

async function update(id, reservaData) {
    const {Date, Hora_Inicio, Hora_Final, Is_accepted, Mesa_Id, Name} = reservaData;
    try {
        // Crear el objeto de usuario actualizado
        const nuevoreserva = {};
        if (Date) nuevoreserva.Date = Date;
        if (Hora_Inicio) nuevoreserva.Hora_Inicio = Hora_Inicio;
        if (Hora_Final) nuevoreserva.Hora_Final = Hora_Final;
        if (Is_accepted) nuevoreserva.Is_accepted = Is_accepted;
        if (Mesa_Id) nuevoreserva.Mesa_Id = Mesa_Id;
        if (Name) nuevoreserva.Name = Name;

        // Verificar si hay campos para actualizar
        if (Object.keys(nuevoreserva).length === 0) {
            return {error: "No hay campos válidos para actualizar."};
        }
        // Realizar la actualización
        const reserva = await ReservasModel.update(nuevoreserva, {where: {Reserva_id: id}});

        return {reserva, nuevoreserva};
    } catch (error) {
        console.log("ERROR ES:", error);
        return {error};
    }
}

async function create(reservaData, id) {
    const { Date, Hora_Inicio, Hora_Final, Mesa_id, Name } = reservaData;

    // Validaciones básicas
    if (!Date || !Hora_Inicio || !Hora_Final || !Name) {
        return { error: "Todos los campos son obligatorios" };
    }

    // Validación de fecha y hora
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(Date)) {
        return { error: "El formato de la fecha es incorrecto. Debe ser YYYY-MM-DD" };
    }

    const timeRegex = /^\d{2}:\d{2}(:\d{2})?$/;
    if (!timeRegex.test(Hora_Inicio) || !timeRegex.test(Hora_Final)) {
        return { error: "El formato de la hora es incorrecto. Debe ser HH:MM o HH:MM:SS" };
    }
/*     const maxIdResult = await ReservasModel.findOne({attributes: ['Reservas_id'], order: [['Reservas_id', 'DESC']]});
    console.log("EL ID MAXIMO ES:",maxIdResult)

    let maxReservaId = null;
    
    if (maxIdResult) {
        maxReservaId = maxIdResult.dataValues.Reservas_id +1;
    } */
    const sessionUserId = id

        try {
            const newReserva = await ReservasModel.create({
                Reservas_id:1,
                User_id:sessionUserId,
                Date,
                Hora_Inicio,
                Hora_Final,
                Is_accepted:0,
                Mesa_id:1,
                Name,
            });
            console.log("new reserva", newReserva);
            return { data: newReserva };

        } catch (error) {

            console.error("Error al crear la reserva:", error);
            return { error: "Error al crear la reserva. Por favor, inténtelo de nuevo más tarde." };
        }

}


async function remove(id) {
    try {
        const reserva = await ReservasModel.findByPk(id);
        await reserva.destroy();
        return {data:reserva};
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