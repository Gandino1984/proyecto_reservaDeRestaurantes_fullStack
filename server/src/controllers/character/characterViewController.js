import characterController from "./characterController.js";
import raceModel from "../../models/raceModel.js";

/**
 * @module src/controllers/character/characterViewController
 */

/**
 * Retrieves all characters based on the provided ID and renders a list of characters.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @return {void}
 */
async function getAll (req, res){
    const id = req.session.user.user_id
    //console.log("EL ID ES:", id)
    const {error,data} = await characterController.getAll(id);
    console.log("LA DATA ES:", data)
    res.render("character/list", {error,data, id});
}

/**
 * Retrieves all enemies based on the provided ID and renders a list of enemies.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @return {void}
 */
async function getAllEnemy(req, res) {
    const id = req.session.user.user_id
    const character = req.query.Character_id
    console.log("EL ALIADO ES:", character)
    const {error,data} = await characterController.getAllEnemy(id);
    res.render("character/enemyList", {error,data,character});
}

/**
 * Starts a game by retrieving character and enemy data, then renders the game view.
 *
 * @param {object} req - The request object containing character and enemy IDs.
 * @param {object} res - The response object to render the game view.
 * @return {void}
 */
async function startGame(req, res) {
  
    const id = parseInt(req.query.Character_id);
    const id2 = parseInt(req.query.enemy_id);

    const {error,data} = await characterController.getById(id);
    const {error2,data2} = await characterController.getByIdEnemy(id2);
 
    res.render("character/juego", {error,data,error2,data2});
    
}

/**
 * Retrieves a character by ID including their weapon, map, and race information.
 *
 * @param {object} req - The request object containing the character ID.
 * @param {object} res - The response object to render the character information.
 * @return {void}
 */
async function getById(req,res){
    const id = parseInt(req.params.id);
    const{error,data} = await characterController.getById(id);
    const racename = await characterController.getRaceIdByCharacterId(id)
    const weaponName = await characterController.getweaponIdByCharacterId(id)
    const mapName = await characterController.getMapIdByCharacterId(id)

    //console.log("El nombre asociado a la raza es:", racename)    
    res.render("character/show", {error,character:data,racename,weaponName,mapName});
}

/**
 * Renders a form for selecting a race by fetching all races from the database.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object to render the race form.
 * @return {void}
 */
async function createFormRace (req,res){
    const razas = await raceModel.findAll();
    //console.log("Las razas son:", razas)
    res.render("character/raza", {razas});
}

/**
 * Renders a form for selecting weapons based on the provided Race_id.
 *
 * @param {object} req - The request object containing the Race_id.
 * @param {object} res - The response object to render the form for selecting weapons.
 * @return {void}
 */
async function createFormWeapon (req,res){
    const race = req.query.Race_id
    const armas = await characterController.getWeaponByRace(race)
    //console.log("Las armas son:",armas)    
    res.render("character/armas",{race, armas});
}

/**
 * Renders a form for maps based on the provided Race_id and Weapon_id.
 *
 * @param {object} req - The request object containing the Race_id and Weapon_id.
 * @param {object} res - The response object to render the map form.
 * @return {void}
 */
async function createFormMaps (req,res){
    const race = req.query.Race_id
    const weapon = req.query.Weapon_id
    const mapas = await characterController.getMapByRace(race)
    res.render("character/mapa",{race,weapon, mapas});
}

/**
 * Creates a new character with provided data and redirects to the character page.
 *
 * @param {object} req - The request object containing character data.
 * @param {object} res - The response object to redirect to the character page.
 * @return {void}
 */
async function create(req, res){
    const {Name, Life_points, Hostile, Race_id, Map_id, Weapon_id} = req.body;
    const User_id = req.session.user.user_id
    //console.log("EL USUARIO ES:",User_id)
    //const {Name, Life_points, Hostile, Race_id, Map_id, Weapon_id} = req.query;
    const{error,data} = await characterController.create({Name, Life_points, Hostile, Race_id, Map_id, Weapon_id, User_id});
    res.redirect("/character");
}


/**
 * Removes a character based on the provided ID and redirects to the character page.
 *
 * @param {object} req - The request object containing the character ID.
 * @param {object} res - The response object to redirect to the character page.
 * @return {void}
 */
async function remove(req, res){
    const id = parseInt(req.params.id);
    const{error,data} = await characterController.remove(id);
    res.redirect("/character");

} 

/**
 * Renders the login page.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object to render the login page.
 * @return {void}
 */
async function crearpage(req,res){
    res.render("login/login");
}

export {
    getAll,
    getAllEnemy,
    getById,
    createFormRace,
    createFormWeapon,
    createFormMaps,
    create,
    remove,
    crearpage,
    startGame
};

export default{
    getAll,
    getAllEnemy,
    getById,
    createFormRace,
    createFormWeapon,
    createFormMaps,
    create,
    remove,
    crearpage,
    startGame
}