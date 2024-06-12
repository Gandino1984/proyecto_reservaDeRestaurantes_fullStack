import restaurantesController from "./restaurantesController.js";

const getAll = async(req,res)=>{
    const userData = req.session.user
    console.log("LA userData ES:", userData)
    const esAdmin = req.session.user.esAdmin
    console.log("ESADMIN ES IGUAL A:",esAdmin)
    const {error,data} = await restaurantesController.getAll(userData);
    res.json({error,data});
}

const getRestauranteByTipo = async(req,res)=>{
    const tipo = req.params
    const {error,data} = await restaurantesController.getRestauranteByTipo(tipo);
    res.json({error,data});
}

const getByProperty = async(req,res)=>{
    const {property,value} = req.query;
    const restaurantes = await restaurantesController.getByProperty(property,value);
    res.json({data:restaurantes})
}

const getById = async (req,res) =>{
    const id = req.params.id
    const restaurantes = await restaurantesController.getById(id);
    res.json({data:restaurantes});
}

const updateRestaurante = async(req,res)=>{
    const id = req.params.id;
    const restaurantes = await restaurantesController.updateRestaurante(id,req.body);
    res.json({data:restaurantes})
}

const remove = async(req,res)=>{
    const id = req.params.id;
    const restaurantes = await restaurantesController.remove(id);
    res.json({data:restaurantes})
}


const create = async(req,res)=>{
    const sesionUserId = req.session.user.user_id
    const restaurante = await restaurantesController.create(req.body, sesionUserId);
    res.json({data:restaurante})
}

export default{
    getAll,
    getRestauranteByTipo,
    getById,
    getByProperty,
    updateRestaurante,
    create,
    remove
}

