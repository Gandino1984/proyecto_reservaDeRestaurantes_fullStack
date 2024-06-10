import userModel from "../../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


/**
 * @module src/controllers/user/userController
 */

/**
 * Retrieves all users based on the user's admin status.
 *
 * @param {object} userData - The user data to determine admin status.
 * @return {object} An object containing the retrieved users or an error.
 */
async function getAll(userData) {
    try {
        if (userData.esAdmin == 1) {
            const users = await userModel.findAll();
            console.log("LOS USUARIOS MOSTRADOS SIENDO ADMIN SON:", users)
            return { data: users };
        }
        if (userData.esAdmin == 0) {
            const user = await userModel.findOne({ where: { User_id: userData.user_id } });
            console.log("LOS USUARIOS MOSTRADOS SIENDO USUARIO SON:", user)
            return { data: [user] };
        }        
    }
    catch (error) {
        console.error(error);
        return { error: error };
    }
}

/**
 * Retrieves a user by ID and returns the user data if found, otherwise an error object.
 *
 * @param {type} id - The ID used to retrieve the user.
 * @return {type} An object containing the user data if found, otherwise an error object.
 */
async function getById(id) {
    try {
        const user = await userModel.findByPk(id);
        //console.log("EL USUARIO ES:", user)
        if (!user) {
            return { error: "El user no existe" };
        }
        return { data: user };
    }
    catch (error) {
        console.error(error);
        return { error };
    }

}

/**
 * Creates a new user with the provided userData.
 *
 * @param {object} userData - The data of the user to be created.
 * @return {object} An object containing the newly created user data.
 */
async function create(userData) {
    try {
        const newuser = await userModel.create(userData);
        console.log("new user",newuser);
        return {data:newuser};
    } catch (error) {
        console.error(error);
        return {error}
    }
}


/**
 * Registers a new user based on the provided user data.
 *
 * @param {object} userData - The data of the user to register.
 * @return {object} An object containing the newly registered user data or an error object.
 */
async function registerUser(userData) {
    const {Name, Is_Admin, Email, Password, Password_repeat} = userData;
    try {
        if(!Email || !Password || !Password_repeat){
            return {error:"falta email o contraseña"};
        }
        if(Password !== Password_repeat){
            return {error:"las contraseñas no coinciden"};
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(Email)) {
            return {error:"El correo electrónico no es válido. Asegúrate de que esté en el formato correcto, como ejemplo@dominio.com."};                       
        } 
        // Regular expression for password validation
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (!passwordRegex.test(Password)) {
            return {error:"La contraseña debe tener al menos 8 carácteres, una mayúscula, una minúscula y un número."};                       
        }
        const {data:oldUser} = await getByEmail(Email);
        console.log("old user",oldUser)
        if(oldUser){
            return {error:"el usuario ya existe"};
        }
        const hash = await bcrypt.hash(Password,10);
        const maxIdResult = await userModel.findOne({attributes: ['User_id'], order: [['User_id', 'DESC']]});
        console.log("EL ID MAXIMO ES:",maxIdResult)

        let maxUserId = null;
        
        if (maxIdResult) {
            maxUserId = maxIdResult.dataValues.User_id +1;
        }
        console.log("EL ID ASIGNADO ES:", maxUserId)
        const nuevoUser = {
            Name,
            User_id: maxUserId,
            Is_Admin: 0,
            Email,
            Password:hash
        }
        const newUser = await create(nuevoUser);
        console.log(newUser)
        return {data:newUser}
    } catch (error) {
        console.error(error);
        return { error: "Ha habido un error en el en el registro" }
    }
}


/**
 * Asynchronous function to log in a user based on provided Email and Password.
 *
 * @param {string} Email - The email of the user trying to log in.
 * @param {string} Password - The password of the user trying to log in.
 * @return {object} An object containing user_id, esAdmin, and token if login is successful, otherwise an error message.
 */
async function login(Email, Password) {
    try {
        if (!Email || !Password) {
            return { error: "Falta Email o contraseña" };
        }

        const { data: oldUser } = await getByEmail(Email);
        if (!oldUser) {
            return { error: "La combinación de usuario y contraseña es errónea" };
        }

        const result = await bcrypt.compare(Password, oldUser.Password);
        if (result) {
            const token = jwt.sign({id:oldUser.user_id,email:oldUser.email},process.env.JWT_SECRET,{expiresIn: 60 * 60})
            console.log("EL TOKEN ES:", token)
            const user_id = oldUser.User_id;
            const esAdmin = oldUser.Is_Admin;
            //console.log("LOS DATOS SON", { user_id, esAdmin, token }); 
            return { data: { user_id, esAdmin, token } };
        } else {
            return { error: "La combinación de usuario y contraseña es errónea" };
        }
    } catch (error) {
        console.error(error);
        return { error: "Ha habido un error en el login" };
    }
}


/**
 * Retrieves a user by their email address.
 *
 * @param {string} Email - The email address of the user to retrieve.
 * @return {object} An object containing the user data if found, otherwise an error object.
 */
async function getByEmail(Email){
    try {
        const user = await userModel.findOne({where:{Email:Email}})
        console.log(user)
        return {data:user};
    } catch (error) {
        console.error(error);
        return {error};
    }
}


/**
 * Updates user information based on the provided ID and user data.
 *
 * @param {type} id - The ID of the user to update.
 * @param {type} userData - The data containing Name, Is_Admin, Email, Password, and Password_repeat.
 * @return {type} An object containing the updated user information or an error.
 */
async function update(id, userData) {
    const {Name, Is_Admin, Email, Password, Password_repeat} = userData;
    try {
        if(Password !== Password_repeat){
            return {error:"las contraseñas no coinciden"};
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(Email)) {
            return {error:"El correo electrónico no es válido. Asegúrate de que esté en el formato correcto, como ejemplo@dominio.com."};                       
        } 
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (!passwordRegex.test(Password)) {
            return {error:"La contraseña debe tener al menos 8 carácteres, una mayúscula, una minúscula y un número."};                       
        }
        const hash = await bcrypt.hash(Password,10);
        const nuevoUser = {};
        if (Name) nuevoUser.Name = Name;
        if (Is_Admin) nuevoUser.Is_Admin = Is_Admin;
        if (Email) nuevoUser.Email = Email;
        if (Password) nuevoUser.Password = hash;

        const usuario = await userModel.update(nuevoUser,{where: {User_id:id}});

        return {data:usuario};
    } catch (error) {
        console.log("ERROR ES:",error);
        return {error}
    }
   
}

/**
 * Retrieves a user by ID and removes them from the database.
 *
 * @param {type} id - The ID used to identify the user.
 * @return {type} An object containing the removed user data.
 */
async function remove(id) {
    try {
        const usuario = await userModel.findByPk(id);
        await usuario.destroy();
        return {data:usuario};
    } catch (error) {
        console.error(error);
        return{error}
    }
    
}

export {
    getAll,
    getById,
    login,
    registerUser,
    create,
    update,
    remove
};


export default {
    getAll,
    getById,
    login,
    registerUser,
    create,
    update,
    remove
};