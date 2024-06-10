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
async function login(userData) {
    const { Email, Password } = userData;
    const { usuarios: userList } = usuarios;

    // Busca el usuario por correo electrónico
    const user = userList.find(usuario => usuario.Email === Email);

    if (!user) {
        return { error: "Usuario no encontrado", data: null };
    }

    // Verifica si la contraseña coincide
    if (user.Password !== Password) {
        return { error: "Contraseña incorrecta", data: null };
    }

    return { data: user, error: null };
}



export {
    getAll,
    loginpage,
    login,
};
export default {
    getAll,
    loginpage,
    login,
};