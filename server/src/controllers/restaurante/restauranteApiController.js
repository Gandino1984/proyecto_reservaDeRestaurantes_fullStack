import restauranteController from "./restauranteController.js";

const getAll = async(req,res)=>{
<<<<<<< HEAD
    const userData = req.user
    console.log("LA userData ES:", userData)
    const esAdmin = req.session.user && req.session.user.esAdmin;
    console.log("ESADMIN ES IGUAL A:",esAdmin)
    const {error,data} = await restauranteController.getAll(userData);
=======
    const {error,data} = await restauranteController.getAll();
    res.json({error,data});
}

const getRestaurantesByUserId = async(req,res)=>{
    const userData = req.user.dataValues.User_id
    console.log("req.user", req.user.dataValues.User_id)
    const {error,data} = await restauranteController.getRestaurantesByUserId(userData);
>>>>>>> dev
    res.json({error,data});
}

const barraDeBusqueda = async(req,res)=>{
    const busquedaData = req.params.busquedaData
    console.log("BusquedaData es:",busquedaData)
    const {error,data} = await restauranteController.barraDeBusqueda(busquedaData);
    res.json({error,data});
}

const getRestauranteByTipo = async(req,res)=>{
    const tipo = req.params.tipo
    const {error,data} = await restauranteController.getRestauranteByTipo(tipo);
    res.json({error,data});
}

const getByProperty = async(req,res)=>{
    const {property,value} = req.query;
    const restaurantes = await restauranteController.getByProperty(property,value);
    res.json({data:restaurantes})
}

const getById = async (req,res) =>{
    const id = req.params.id
    const restaurantes = await restauranteController.getById(id);
    res.json({data:restaurantes});
}

const updateRestaurante = async(req,res)=>{
    const id = req.params.id;
    const restaurantes = await restauranteController.updateRestaurante(id,req.body);
    res.json({data:restaurantes})
}

const remove = async(req,res)=>{
    const id = req.params.id;
    const restaurantes = await restauranteController.remove(id);
    res.json({data:restaurantes})
}


const create = async(req,res)=>{
    const sesionUserId = req.session.user.user_id
    const restaurante = await restauranteController.create(req.body, sesionUserId);
    res.json({data:restaurante})
}

export default{
    getAll,
    barraDeBusqueda,
    getRestaurantesByUserId,
    getRestauranteByTipo,
    getById,
    getByProperty,
    updateRestaurante,
    create,
    remove
}

