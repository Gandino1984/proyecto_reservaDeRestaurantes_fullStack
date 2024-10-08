import restauranteModel from "../../models/restauranteModel.js";
import mesasModel from "../../models/mesasModel.js";
import { Op } from 'sequelize'; 

//Esta funcion sirve para sacar los restaurantes, si eres administrador de la aplicacion (Nosotros) te muestra todos.
//Si no eres administrador filtra todos los restaurantes asociados al User_id de la persona logueada, es decir, sus restaurantes.
async function getAll() {
    try {
            const restaurantes = await restauranteModel.findAll();
            return { data: restaurantes };       
    }
    catch (error) {
        console.error(error);
        return { error: error };
    }
}

async function getRestaurantesByUserId(userData) {
    try {
            const restaurantes = await restauranteModel.findAll({ where: { User_id: userData } });
            console.log("LAS restaurante MOSTRADAS SIENDO USUARIO SON:", restaurantes)
            return { data: restaurantes };             
    }
    catch (error) {
        console.error(error);
        return { error: error };
    }
}


async function barraDeBusqueda(busquedaData) {
    try {
        // if (busquedaData.length > 2) {
            const restaurantes = await restauranteModel.findAll({
                where: {
                    [Op.or]: [
                        {
                            Name: {
                                [Op.like]: `%${busquedaData}%`
                            }
                        },
                        {
                            Tipo_Restaurante: {
                                [Op.like]: `%${busquedaData}%`
                            }
                        }
                    ]
                }
            });
            console.log("LOS RESTAURANTES ENCONTRADOS SON:", restaurantes);
            return { data: restaurantes };
        // } else {
        //     return { data: [], message: 'La búsqueda debe tener más de 3 caracteres' };
        // }
    } catch (error) {
        console.error("Error al buscar restaurantes:", error);
        return { error: error.message };
    }
}



async function getRestauranteByTipo(tipo) {
    try {
        const restaurantes = await restauranteModel.findAll({where: { Tipo_Restaurante: tipo } });        
        console.log("Llego aqui", restaurantes)
        return { data: restaurantes };
    }
    catch (error) {
        console.error(error);
        return { error: error };
    }
}

//Es funcion filtra en base a un propiedad (Nombre de columna) y un valor (Contenido a buscar en esa columna)
//Podria servis para buscar por nombre de restaurante en la columna Name, por ejemplo. Pero es generica y sirve para cualquier columna siempre y cuando el value coincida con algun campo de esa columna.
const getByProperty = async(property,value) =>{
    try {
        const restaurante = await restauranteModel.find({[property]:value})
        return restaurante;
    } catch (error) {
        return null;
    }
}
//Cuando haces click en la tarjeta del restaurante se debera de llamar a esta funcion, dando como argumento el id del restaurante.
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
//Esta funcion coge restautanteData que le llegara desde el front, esta pensado para que si en algun momento quereis modificar Hora_Apertura, Hora_Cierre se pueda. Pero no hace falta incluir todos los campos.
async function updateRestaurante(id, restauranteData) {
    const {Name, Hora_Apertura, Hora_Cierre} = restauranteData;
    try {
        // Crear el objeto de restaurante actualizado
        const nuevoRestaurante = {};
        if (Name) nuevoRestaurante.Name = Name;
        if (Hora_Apertura) nuevoRestaurante.Hora_Apertura = Hora_Apertura;
        if (Hora_Cierre) nuevoRestaurante.Hora_Cierre = Hora_Cierre;


        // Verificar si hay campos para actualizar
        if (Object.keys(nuevoRestaurante).length === 0) {
            return {error: "No hay campos válidos para actualizar."};
        }
        // Realizar la actualización
        const restaurante = await restauranteModel.update(nuevoRestaurante, {where: {Restaurante_id: id}});

        return {restaurante, nuevoRestaurante};
    } catch (error) {
        console.log("ERROR ES:", error);
        return {error};
    }
}


async function create(restauranteData, sesionUserId) {
    const { Name, Hora_Apertura, Hora_Cierre, Tipo_Restaurante } = restauranteData;
    console.log("el tipo de restaurante es", Tipo_Restaurante)
    // Validaciones básicas
    if (!Name || !Hora_Apertura || !Hora_Cierre || !Tipo_Restaurante) {
        return { error: "Todos los campos son obligatorios" };
    }

    try {
        const maxIdResult = await restauranteModel.findOne({
            attributes: ['Restaurante_id'],
            order: [['Restaurante_id', 'DESC']]
        });

        let maxRestauranteId = 1;

        if (maxIdResult) {
            maxRestauranteId = maxIdResult.dataValues.Restaurante_id + 1;
        }

        const newRestaurante = await restauranteModel.create({
            Restaurante_id: maxRestauranteId,
            Name,
            Hora_Apertura,
            Hora_Cierre,
            User_id: sesionUserId,
            Tipo_Restaurante
        });

        console.log("Nuevo restaurante creado:", newRestaurante);

        return { data: newRestaurante };
    } catch (error) {
        console.error("Error al crear el restaurante:", error);
        return { error: "Error al crear el restaurante. Por favor, inténtelo de nuevo más tarde." };
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
    barraDeBusqueda,
    getRestaurantesByUserId,
    getRestauranteByTipo,
    getById,
    getByProperty,
    create,
    updateRestaurante,
    remove
};


export default {
    getAll,
    barraDeBusqueda,
    getRestaurantesByUserId,
    getRestauranteByTipo,
    getById,
    getByProperty,
    create,
    updateRestaurante,
    remove
};