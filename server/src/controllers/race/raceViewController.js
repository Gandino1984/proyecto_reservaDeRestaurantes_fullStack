import raceController from "./raceController.js";

async function getAll (req, res){
    const {error,data} = await raceController.getAll();
    res.render("race/list", {error,data});
}

async function getById(req,res){
    const id = parseInt(req.params.id);
    const{error,data} = await raceController.getById(id);
    res.render("race/show", {error,race:data});
}

async function createForm (req,res){
    res.render("race/new");
}

async function create(req, res){
    //conts (Name, Race, Hostile, Race_id) = req.body
    const {Name, Max_life} = req.query;
    const{error,data} = await raceController.create({Name, Max_life});
    res.redirect("/race");
}

async function updateForm (req,res){
    const id= req.params.id;
    const race = await raceController.getById(id);
    res.render("race/update",{race});
}

async function update(req, res){
    const id = parseInt(req.params.id);
    const {Name, Max_life} = req.query;
    const{error,data} = await raceController.update(id,{Name, Max_life});
    res.redirect("/race");
}

async function remove(req, res){
    const id = parseInt(req.params.id);
    const{error,data} = await raceController.remove(id);
    res.redirect("/race");

}

export {
    getAll,
    getById,
    createForm,
    create,
    updateForm,
    update,
    remove
};

export default{
    getAll,
    getById,
    createForm,
    create,
    updateForm,
    update,
    remove
}