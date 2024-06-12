import mesasController from "./mesasController.js";

const getAll = async(req,res)=>{
    const mesasData = req.session.user
    console.log("LA mesasDATA ES:", mesasData)
    const esAdmin = req.session.user.esAdmin
    console.log("ESADMIN ES IGUAL A:",esAdmin)
    const {error,data} = await mesasController.getAll(mesasData);
    res.json({error,data});
}

const getByProperty = async(req,res)=>{
    const {property,value} = req.query;
    const mesas = await mesasController.getByProperty(property,value);
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
    getByProperty,
    update,
    create,
    remove
}

