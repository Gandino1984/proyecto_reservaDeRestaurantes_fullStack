
import characterModel from "../../models/characterModel.js";
import raceModel from "../../models/raceModel.js";
import mapModel from "../../models/mapModel.js";
import weaponModel from "../../models/weaponModel.js";
import { Op } from "sequelize";

/**
 * @module src/controllers/character/characterController
 */

/**
 * Retrieves all characters based on the provided ID.
 *
 * @param {number} id - The ID used to filter characters.
 * @return {object} An object containing the data of the retrieved characters.
 */
async function getAll(id) {
    try {
        const personajes = await characterModel.findAll({ 
            include:["arma","mapa","raza"], 
            where: { 
                [Op.or]: [
                    {User_id: id },
                    {
                        [Op.and]: [
                            { User_id: null },
                            { Hostile: 0 }
                        ]
                    }
                ]
            } 
        });        
        console.log(personajes)
        return { data: personajes };
    }
    catch (error) {
        console.error(error);
        return { error: error };
    }
}

/**
 * Retrieves all enemies based on the provided ID.
 *
 * @param {number} id - The ID used to filter enemies.
 * @return {object} An object containing the data of the retrieved enemies.
 */
async function getAllEnemy(id) {
    try {
        const enemies = await characterModel.findAll({ 
            include: ["arma", "mapa", "raza"],
            where: { Hostile: 1 } 
        }); 
               
        //console.log(enemies)
        return { data: enemies };
    }
    catch (error) {
        console.error(error);
        return { error: error };
    }
}


/**
 * Retrieves the race ID of a character based on the provided character ID.
 *
 * @param {type} Character_id - The ID of the character.
 * @return {type} The race ID of the character.
 */
async function getRaceIdByCharacterId(Character_id) {
    const name = await characterModel.findOne({ where: { Character_id: Character_id } }); 
    const race = getRaceNameByRaceId(name.Race_id)
    return race
}

/**
 * Retrieves the name of a race based on the provided Race_id.
 *
 * @param {number} Race_id - The ID used to retrieve the race name.
 * @return {string} The name of the race if found, null if not found or error occurs.
 */
async function getRaceNameByRaceId(Race_id) {
    try {
        const race = await raceModel.findOne({ where: { Race_id: Race_id } });      
        if (race) {
            return race.Name;
        } 
    } catch (error) {
        console.error("Error al obtener el nombre de la raza:", error);
        return null; // Manejar el error devolviendo un valor predeterminado
    }
}

/**
 * Retrieves the weapon ID of a character based on the provided Character_id.
 *
 * @param {type} Character_id - The ID of the character.
 * @return {type} The weapon ID of the character.
 */
async function getweaponIdByCharacterId(Character_id) {
    const name = await characterModel.findOne({ where: { Character_id: Character_id } }); 
    const weapon = getWeaponNameByWeaponId(name.Weapon_id)
    return weapon
}

/**
 * Retrieves the name of a weapon based on the provided Weapon_id.
 *
 * @param {type} Weapon_id - The ID used to retrieve the weapon name.
 * @return {type} The name of the weapon if found, null if not found or error occurs.
 */
async function getWeaponNameByWeaponId(Weapon_id) {
    try {
        const weapon = await weaponModel.findOne({ where: { Weapon_id: Weapon_id } });      
        if (weapon) {
            return weapon.Name;
        } 
    } catch (error) {
        console.error("Error al obtener el nombre de la raza:", error);
        return null; // Manejar el error devolviendo un valor predeterminado
    }
}

/**
 * Retrieves the map ID associated with a character ID.
 *
 * @param {type} Character_id - The ID of the character.
 * @return {type} The map ID of the character.
 */
async function getMapIdByCharacterId(Character_id) {
    const name = await characterModel.findOne({ where: { Character_id: Character_id } }); 
    const race = getMapNameByMapId(name.Map_id)
    return race
}

/**
 * Retrieves the map name based on the provided Map_id.
 *
 * @param {type} Map_id - The ID used to retrieve the map name.
 * @return {type} The name of the map if found, null if not found or error occurs.
 */
async function getMapNameByMapId(Map_id) {
    try {
        const map = await mapModel.findOne({ where: { Map_id: Map_id } });      
        if (map) {
            return map.Name;
        } 
    } catch (error) {
        console.error("Error al obtener el nombre de la raza:", error);
        return null; // Manejar el error devolviendo un valor predeterminado
    }
}

/**
 * Retrieves weapons based on the provided Race_id.
 *
 * @param {type} Race_id - The ID used to retrieve weapons by race.
 * @return {type} The weapons associated with the provided Race_id.
 */
async function getWeaponByRace(Race_id) {
    const armas = await weaponModel.findAll({where:{Race_id:Race_id}});
    //const armasPorRaza = armas.filter(arma => arma.Race_id == Race_id)
    return armas
}

/**
 * Retrieves maps based on the provided Race_id.
 *
 * @param {type} Race_id - The ID used to retrieve maps by race.
 * @return {type} The maps associated with the provided Race_id.
 */
async function getMapByRace(Race_id) {
    const mapas = await mapModel.findAll({where:{Race_id:Race_id}});
    console.log(mapas)
    //const armasPorRaza = armas.filter(arma => arma.Race_id == Race_id)
    return mapas
}

/**
 * Retrieves a character by ID including their weapon, map, and race information.
 *
 * @param {type} id - The ID used to retrieve the character.
 * @return {type} An object containing the character data if found, otherwise an error object.
 */
async function getById(id) {
    try {
        const personaje = await characterModel.findByPk(id, {include:["arma","mapa","raza"], });
        //console.log(personaje)
        if (!personaje) {
            return { error: "El personaje no existe" };
        }
        return { data: personaje };
    }
    catch (error) {
        console.error(error);
        return { error };
    }

}

/**
 * Retrieves a character by ID including their weapon, map, and race information.
 *
 * @param {type} id - The ID used to retrieve the character.
 * @return {type} An object containing the character data if found, otherwise an error object.
 */
async function getByIdEnemy(id) {
    try {
        const personaje = await characterModel.findByPk(id, {include:["arma","mapa","raza"], });
        //console.log(personaje)
        if (!personaje) {
            return { error: "El personaje no existe" };
        }
        return { data2: personaje };
    }
    catch (error) {
        console.error(error);
        return { error };
    }
}


/**
 * Creates a new character with default Life_points and Hostile values.
 *
 * @param {object} userData - The data for the new character.
 * @return {object} An object containing the newly created character and a potential error.
 */
async function create(userData) {
    try {
        userData.Life_points = 100;
        userData.Hostile = 0;        
        const newCharacter = await characterModel.create(userData);
         //console.log("newCharacter:", newCharacter)
        return { data: newCharacter, error: null }; 
    } catch (error) {
        console.error(error);
        return {error}
    }
}


/**
 * Retrieves a character by ID and removes it from the database.
 *
 * @param {type} id - The ID used to identify the character.
 * @return {type} An object containing the removed character data.
 */
async function remove(id) {
    try {
        const character = await characterModel.findByPk(id);
        await character.destroy();
        return {data:character};
    } catch (error) {
        console.error(error);
        return{error}
    }
    
}


export {
    getAll,
    getAllEnemy,
    getById,
    getByIdEnemy,
    getWeaponByRace,
    getMapByRace,
    getRaceIdByCharacterId,
    getweaponIdByCharacterId,
    getMapIdByCharacterId,
    create,
    // update,
    remove
};


export default {
    getAll,
    getAllEnemy,
    getWeaponByRace,
    getMapByRace,
    getRaceIdByCharacterId,
    getweaponIdByCharacterId,
    getMapIdByCharacterId,
    getById,
    getByIdEnemy,
    create,
    // update,
    remove
};