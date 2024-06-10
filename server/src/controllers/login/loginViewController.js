import loginController from "./loginController.js";

async function loginpage(req,res){
    res.render("login/login");
}

async function login(req, res) {
    const { Email, Password } = req.body;
    const { error, data } = await loginController.login({ Email, Password });

    if (error) {
        res.render("login/login", { error }); // Muestra el error en la vista
    } else {
        res.redirect("/user"); // Redirige al usuario a la página de inicio después de iniciar sesión
    }
}

export {
    loginpage,
    login,
};
export default {
    loginpage,
    login,
};