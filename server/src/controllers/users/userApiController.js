import userController from "./userController.js";

const getAll = async(req,res)=>{
    const userData = req.session.user
    console.log("LA USERDATA ES:", userData)
    const esAdmin = req.session.user.esAdmin
    console.log("ESADMIN ES IGUAL A:",esAdmin)
    const {error,data} = await userController.getAll(userData);
    res.json({error,data});
}

const getById = async (req,res) =>{
    const id = req.params.id
    const user = await userController.getById(id);
    res.json({data:user});
}

const getByProperty=async(req,res)=>{
    const {property,value}=req.query;
    const users = await userController.getByProperty(property,value);
    res.json({data:users})
}

const register = async(req,res)=>{
    const user = await userController.register(req.body);
    console.log("llego aqui")
    if(user.error){
        return res.json({error:user.error});
    }
    res.json({data:user})
}
const login = async(req,res) => {
    const { Email, Password } = req.body;
    const data = await userController.login(Email, Password);
    if(data.error){
        return res.status(data.status).json({error:data.error});
    }
    req.session.user = data;
    console.log("req.session.user",req.session.user)
    res.json({data})
}

const create = async(req,res)=>{
    const user = await userController.create(req.body);
    res.json({data:user})
}

const update = async(req,res)=>{
    const id = req.params.id;
    const user = await userController.update(id,req.body);
    res.json({data:user})
}

const remove = async(req,res)=>{
    const id = req.params.id;
    const user = await userController.remove(id);
    res.json({data:user})
}

async function logout(req,res){
    req.user = null;
    console.log("req.user", req.user)
    res.json (req.user)
}

export default{
    getAll,
    getById,
    getByProperty,
    login,
    register,
    create,
    update,
    logout,
    remove
}

