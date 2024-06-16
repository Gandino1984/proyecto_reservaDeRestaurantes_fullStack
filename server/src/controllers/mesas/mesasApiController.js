import mesasController from "./mesasController.js";

const getAll = async(req,res)=>{
    const mesasData = req.user
    console.log("LA mesasDATA ES:", mesasData)
    const {error,data} = await mesasController.getAll(mesasData);
    res.json({error,data});
}

const getMesasByRestaurante = async(req,res)=>{
    const restauranteId = req.params.restauranteId;
    const mesas = await mesasController.getMesasByRestaurante(restauranteId);
    res.json({data:mesas})
}

const getById = async (req,res) =>{
    const id = req.params.id
    const mesas = await mesasController.getById(id);
    res.json({data:mesas});
}

const update = async(req,res)=>{
    const id = req.params.id;
    const mesas = await mesasController.update(id,req.body);
    res.json({data:mesas})
}

const remove = async(req,res)=>{
    const id = req.params.id;
    const mesas = await mesasController.remove(id);
    res.json({data:mesas})
}

const create = async(req,res)=>{
    const mesa = await mesasController.create(req.body);
    res.json({data:mesa})
}

export default{
    getAll,
    getById,
    getMesasByRestaurante,
    update,
    create,
    remove
}

