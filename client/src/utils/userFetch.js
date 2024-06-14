import fetchData from "fetch.js";

// Funciones para llamar a la Api

const getUserByID = async (userID) => {
    const result = await fetchData(`/users/${userID}`, "get");
    return result;
};

const getAllUsers = async () => {
    const result = await fetchData("/users", "get");
    return result;
};

const updateUser = async (userID, userData) => {
    const result = await fetchData(`/users/${userID}`, "put", userData);
    return result;
};

const register = async(userData)=>{
    const result = await fetchData("/register","post",userData);
    return result;
};
const login = async(userData)=>{
    const result = await fetchData("/login","post",userData);
    return result;
};
const logout = async () => {
    const result = await fetchData("/logout", "post");
    return result;
};

const removeUser = async(usersID) =>{
    const result = await fetchData(`/users/${usersID}`,"delete");
    console.log(result);
    return result;
}

// Exportamos

export {
    register,
    updateUser,
    getUserByID,
    getAllUsers,
    login,
    logout,
    removeUser
};
