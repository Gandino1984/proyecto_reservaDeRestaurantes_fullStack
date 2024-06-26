import ReservasModel from "../../models/reservasModel.js";
import MesasModel from "../../models/mesasModel.js";
import RestauranteModel from "../../models/restauranteModel.js";
import mesasController from "../mesas/mesasController.js";
import { Op } from 'sequelize'; 


async function getAll(userData) {
    try {
        if (userData.Is_Admin == 1) {
            const reservas = await ReservasModel.findAll();
            console.log("LAS RESERVAS MOSTRADAS SIENDO ADMIN SON:", reservas)
            return { data: reservas };
        }
        if (userData.Is_Admin == 0) {
            const reserva = await ReservasModel.findAll({ where: { User_id: userData.User_id } });
            console.log("LAS RESERVAS MOSTRADAS SIENDO USUARIO SON:", reserva)
            return { data: reserva };
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



const getReservasPorDiaYSillas = async ({ numeroSillas, dia, restaurante }) => {
    try {
        const mesas = await MesasModel.findAll({
            where: {
                Sillas: numeroSillas,
                Restaurante_id: restaurante,
            },
            include: [{
                model: ReservasModel,
                as: "reservas",
                where: {
                    Date: dia
                },
                required: false 
            }]
        });

        console.log("LAS MESAS SON:", mesas)
        return { data: mesas };
    } catch (error) {
        console.error("Error al obtener reservas:", error);
        return { error: error.message };
    }
};

const getReservasPorMesaIds = async (mesaIds) => {
    try {
        const reservas = await ReservasModel.findAll({
            where: {
                Mesa_id: {
                    [Op.in]: mesaIds,  // Filtrar por array de IDs
                },
            },
        });
        return reservas;
    } catch (error) {
        console.error("Error al obtener reservas:", error);
        throw error;
    }
};

const getReservasPorRestaurante = async (restauranteId) => {
    try {
        console.log("RestauranteId",restauranteId)
        // Obtener mesas por Restaurante_id
        const mesas = await mesasController.getMesasByRestaurante(restauranteId);
        console.log("Mesas filtradas", mesas)

        // Obtener los IDs de las mesas
        const mesaIds = mesas.map(mesa => mesa.Mesa_id);
        console.log("MesaId filtrado", mesaIds)

        // Si no hay mesas, no hay reservas
        if (mesaIds.length === 0) {
            return { data: [] };
        }

        // Obtener reservas por array de Mesa_ids
        const reservas = await getReservasPorMesaIds(mesaIds);

        // Combinar mesas y reservas en un solo resultado
        const mesasConReservas = mesas.map(mesa => {
            const reservasDeLaMesa = reservas.filter(reserva => reserva.Mesa_id === mesa.Mesa_id);
            return {
                ...mesa.toJSON(),
                reservas: reservasDeLaMesa,
            };
        });

        console.log("MESAS CON RESERVAS:", mesasConReservas);
        return { data: mesasConReservas };
    } catch (error) {
        console.error("Error al obtener reservas:", error);
        return { error: error.message };
    }
};




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
        const nuevoReserva = {};
        if (Date) nuevoReserva.Date = Date;
        if (Hora_Inicio) nuevoReserva.Hora_Inicio = Hora_Inicio;
        if (Hora_Final) nuevoReserva.Hora_Final = Hora_Final;
        if (Is_accepted) nuevoReserva.Is_accepted = Is_accepted;
        if (Mesa_Id) nuevoReserva.Mesa_Id = Mesa_Id;
        if (Name) nuevoReserva.Name = Name;

        // Verificar si hay campos para actualizar
        if (Object.keys(nuevoReserva).length === 0) {
            return {error: "No hay campos válidos para actualizar."};
        }
        // Realizar la actualización
        const reserva = await ReservasModel.update(nuevoReserva, {where: {Reservas_id: id}});

        return {reserva, nuevoReserva};
    } catch (error) {
        console.log("ERROR ES:", error);
        return {error};
    }
}

async function create(reservaData, id) {
    const { Date, Hora_Inicio, Hora_Final, Mesa_id, Name } = reservaData;
    
    if (!Date || !Hora_Inicio || !Hora_Final || !Name) {
        return { error: "Todos los campos son obligatorios" };
    }
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(Date)) {
        return { error: "El formato de la fecha es incorrecto. Debe ser YYYY-MM-DD" };
    }
    const timeRegex = /^\d{2}:\d{2}(:\d{2})?$/;
    if (!timeRegex.test(Hora_Inicio) || !timeRegex.test(Hora_Final)) {
        return { error: "El formato de la hora es incorrecto. Debe ser HH:MM o HH:MM:SS" };
    }
    const maxIdResult = await ReservasModel.findOne({attributes: ['Reservas_id'], order: [['Reservas_id', 'DESC']]});
    console.log("EL ID MAXIMO ES:",maxIdResult)
    let maxReservaId = null;
    if (maxIdResult) {
    maxReservaId = maxIdResult.dataValues.Reservas_id +1;
    }
    const sessionUserId = id

    const reservaExistente = await ReservasModel.findOne({where: {Date: Date,Hora_Inicio: Hora_Inicio, Hora_Final: Hora_Final }});

    if (reservaExistente) {
        return { error: "No se puede crear la reserva, ya hay una reserva ese dia y en ese rango de horas" };
 
    }

        try {
            const newReserva = await ReservasModel.create({
                Reservas_id:maxReservaId,
                User_id:sessionUserId,
                Date,
                Hora_Inicio,
                Hora_Final,
                Is_accepted:0,
                Mesa_id,
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
    getReservasPorDiaYSillas,
    getReservasPorRestaurante,
    create,
    update,
    remove
};


export default {
    getAll,
    getById,
    getByProperty,
    getReservasPorDiaYSillas,
    getReservasPorRestaurante,
    create,
    update,
    remove
};