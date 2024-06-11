import userModel from "../../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

async function register(userData) {
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
            Password:hash,
            Is_Client:0
        }
        const newUser = await create(nuevoUser);
        console.log(newUser)
        return {data:newUser}
    } catch (error) {
        console.error(error);
        return { error: "Ha habido un error en el en el registro" }
    }
}

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
            const token = jwt.sign({id:oldUser.user_id,email:oldUser.email},process.env.JWT_SECRET,{expiresIn: 60 * 60 * 24})
            console.log("EL TOKEN ES:", token)
            const user_id = oldUser.User_id;
            const esAdmin = oldUser.Is_Admin;
            //console.log("LOS DATOS SON", { user_id, esAdmin, token }); 
            return { user_id, esAdmin, token };
        } else {
            return { error: "La combinación de usuario y contraseña es errónea" };
        }
    } catch (error) {
        console.error(error);
        return { error: "Ha habido un error en el login" };
    }
}

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

async function update(id, userData) {
    const {Name, Is_Admin, Email, Password, Password_repeat} = userData;
    try {
        // Validar contraseñas sólo si se proporcionan
        if (Password || Password_repeat) {
            if (Password !== Password_repeat) {
                return {error: "Las contraseñas no coinciden"};
            }
            const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
            if (!passwordRegex.test(Password)) {
                return {error: "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número."};
            }
        }

        // Validar el correo electrónico sólo si se proporciona
        if (Email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(Email)) {
                return {error: "El correo electrónico no es válido. Asegúrate de que esté en el formato correcto, como ejemplo@dominio.com."};
            }
        }

        // Crear el objeto de usuario actualizado
        const nuevoUser = {};
        if (Name) nuevoUser.Name = Name;
        if (Is_Admin !== undefined) nuevoUser.Is_Admin = Is_Admin;  // Permitir falso explícito
        if (Email) nuevoUser.Email = Email;
        if (Password) {
            const hash = await bcrypt.hash(Password, 10);
            nuevoUser.Password = hash;
        }

        // Verificar si hay campos para actualizar
        if (Object.keys(nuevoUser).length === 0) {
            return {error: "No hay campos válidos para actualizar."};
        }

        // Realizar la actualización
        const usuario = await userModel.update(nuevoUser, {where: {User_id: id}});

        return {usuario, nuevoUser};
    } catch (error) {
        console.log("ERROR ES:", error);
        return {error};
    }
}

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
    register,
    create,
    update,
    remove
};


export default {
    getAll,
    getById,
    login,
    register,
    create,
    update,
    remove
};