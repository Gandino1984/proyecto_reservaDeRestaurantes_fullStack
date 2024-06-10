import usuarios from "../user/userController.js";
import userController from "../user/userController.js";
//console.log(usuarios)

async function getAll(req,res){
    const {error,data} = await userController.getAll();
    res.render("user/userlist",{error,data});
}

async function loginpage(){
    return {data:usuarios}
}
async function create(userData) {
    const { Name, Is_admin, Email, Password, Password_repeat} = userData;
    if (Password !== Password_repeat){
        return {error:"Ambas contraseñas deben coincidir", data: null}; 
    }
    if (!Email.includes("@")){
        return {error:"Formato no válido para correo electrónico", data: null}; 
    }
    const { usuarios: userList } = usuarios;
    const user = userList.find(usuario => usuario.Email === Email);
    if (user) {
        return { error: "Ya existe una cuenta con ese correo", data: null };
    }
    const maxId = Math.max(...userList.map(usuario => usuario.User_id));
    const newId = maxId + 1;
    const newUser = {
        Name,
        User_id: newId,
        Is_admin: 0,
        Email,
        Password
    };
    userList.push(newUser);
    console.log(newUser)
    return { data: newUser, error: null }; // Devuelve null para error si no hay errores
}



export {
    getAll,
    loginpage,
    create,
};
export default {
    getAll,
    loginpage,
    create,
};