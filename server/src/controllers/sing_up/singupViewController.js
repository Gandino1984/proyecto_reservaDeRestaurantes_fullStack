import singUpController from "./singUpController.js"

async function loginpage(req,res){
    res.render("singup/singup");
}

async function create(req,res){
    const {Name,Is_admin,Email,Password, Password_repeat} = req.body;
    const {error,data} = await singUpController.create({Name,Is_admin,Email,Password,Password_repeat});
    if (error) {
        res.render("singup/singup", { error }); // Pasa el error a la vista para que se muestre
    } else {
        res.redirect("/user");
    }   
}


export {
    loginpage,
    create,
};
export default {
    loginpage,
    create,
};