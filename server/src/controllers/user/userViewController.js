import userController from "./userController.js";

/**
 * @module src/controllers/user/userViewController
 */

/**
 * Renders the login form.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object to render the login form.
 * @return {void}
 */
async function loginForm(req,res){
    res.render("user/login");
}

/**
 * Logs in a user based on the provided email and password.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @return {void}
 */
async function login(req, res) {
    const { Email, Password } = req.body;
    const { error, data } = await userController.login( Email, Password );

    if (error) {
        res.render("user/login", { error }); // Muestra el error en la vista
    } else {
        req.session.user = data;
        console.log("LA DATA ES:",data)
        res.redirect("/character"); // Redirige al usuario a la página de inicio después de iniciar sesión
    }
}

/**
 * Renders the registration form for users.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object to render the registration form.
 * @return {void}
 */
async function registerForm(req,res){
    res.render("user/singup");
}
/**
 * Registers a new user based on the provided user data.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object to handle the registration process.
 * @return {void}
 */

async function register(req,res) {
    const {Name, Is_Admin, Email, Password, Password_repeat} = req.body;
    const {error,data} = await userController.registerUser({Name, Is_Admin, Email, Password, Password_repeat})
    console.log("EL NUEVO USUARIO ES:",{error,data})
    if(error){
        res.render("user/singup",{error});
    }
    else{
        res.redirect("/character");
    }
}

/**
 * Logs out the current user by clearing the session user and redirects to the character page.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object to redirect to the character page.
 * @return {void}
 */
async function logout(req,res){
    req.session.user = null;
    console.log("req session user", req.session.user)
    res.redirect("/user/login");
}

/**
 * Retrieves user data based on the session user, checks for admin status, and renders the user list page.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object to render the user list page.
 * @return {void}
 */
async function getAll(req,res){
    const userData = req.session.user
    console.log("LA USERDATA ES:", userData)
    const esAdmin = req.session.user.esAdmin
    console.log("ESADMIN ES IGUAL A:",esAdmin)
    const {error,data} = await userController.getAll(userData);
    res.render("user/userlist",{error,data, esAdmin});
}

/**
 * Renders the user update form based on the user ID obtained from the request parameters.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object to render the user update form.
 * @return {void}
 */
async function updateForm(req, res) {
        const esAdmin = req.session.user.esAdmin
        const id = parseInt(req.params.id);
        const { error, data: user } = await userController.getById(id);
        res.render("user/userupdate",{error,user,esAdmin});       
}


/**
 * Retrieves user data based on the provided ID, renders the user show page, and handles any errors.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object to render the user show page.
 * @return {void}
 */
async function getById(req,res){
    const id = parseInt(req.params.id);
    const{error,data} = await userController.getById(id);
    res.render("user/usershow", {error,user:data});
}

/**
 * Updates user information based on the provided ID and user data, then renders the user update page or redirects to the user page.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @return {void}
 */
async function update(req, res) {
        const id = parseInt(req.params.id);
        const { Name, Is_Admin, Email, Password, Password_repeat} = req.body;
        const realIsAdmin = Is_Admin === "on"? 1 : 0;
        const { error, data } = await userController.update(id, { Name, Is_Admin:realIsAdmin, Email, Password, Password_repeat});
        if(error){
            res.render("user/userupdate",{error});
        }
        else{
            res.redirect("/user");
        }
    }

/**
 * Removes a user based on the provided ID and redirects to the user page.
 *
 * @param {object} req - The request object containing the user ID.
 * @param {object} res - The response object to redirect to the user page.
 * @return {void}
 */
async function remove(req,res){
    const id = parseInt(req.params.id);
    const {error,data} = await userController.remove(id);
    res.redirect("/user");
}

export {
    register,
    registerForm,
    login,
    loginForm,
    logout,
    getAll,
    getById,
    updateForm,
    update,
    remove
}

export default {
    register,
    registerForm,
    login,
    loginForm,
    logout,
    getAll,
    getById,
    updateForm,
    update,
    remove
}