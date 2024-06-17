import reservasController from "./reservasController.js";

const getAll = async(req,res)=>{
    const reservasData = req.user
    console.log("LA reservasDATA ES:", reservasData)
    const esAdmin = req.user.dataValues.Is_Admin
    console.log("ESADMIN ES IGUAL A:",esAdmin)
    const {error,data} = await reservasController.getAll(reservasData);
    res.json({error,data});
}

const getByProperty = async(req,res)=>{
    const {property,value} = req.query;
    const reservas = await reservasController.getByProperty(property,value);
    res.json({data:reservas})
}

const getReservasPorDiaYSillas = async (req, res) => {
    const { restaurante, numeroSillas, dia } = req.params;
    const { data, error } = await reservasController.getReservasPorDiaYSillas({ numeroSillas, dia, restaurante });

    if (error) {
        return res.status(500).json({ error });
    }

    res.json({ data });
};

const getReservasPorRestaurante = async (req, res) => {
    const restauranteId = req.params.restauranteid;
    console.log("Restaurante en api controller", restauranteId)
    const { data, error } = await reservasController.getReservasPorRestaurante(restauranteId);

    if (error) {
        return res.status(500).json({ error });
    }

    res.json({ data });
};

const getById = async (req,res) =>{
    const id = req.params.id
    const reservas = await reservasController.getById(id);
    res.json({data:reservas});
}

const update = async(req,res)=>{
    const id = req.params.id;
    const reservas = await reservasController.update(id,req.body);
    res.json({data:reservas})
}

const remove = async(req,res)=>{
    const id = req.params.id;
    const reservas = await reservasController.remove(id);
    res.json({data:reservas})
}

const create = async(req,res)=>{
    const sesionUserId = req.session.user.user_id
    const reserva = await reservasController.create(req.body, sesionUserId);
    res.json({data:reserva})
}

export default{
    getAll,
    getById,
    getByProperty,
    getReservasPorDiaYSillas,
    getReservasPorRestaurante,
    update,
    create,
    remove
}

