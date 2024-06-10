import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

import mapModel from "./mapModel.js";
import characterModel from "./characterModel.js";
import weaponModel from "./weaponModel.js";

/**
 * @module src/models/raceModel
 */

/**
 * Defines the race model with attributes such as Race_id, Name, Max_life.
 */
const raceModel = sequelize.define("Race",
    {
        Race_id:{
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
        Name: {
            type:DataTypes.STRING(45),
            allowNull:false,
            unique:true,
        },
        Max_life:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
    }
)

raceModel.hasMany(mapModel,{foreignKey:"Race_id"});
mapModel.hasMany(raceModel,{as:"razas",foreignKey:"Race_id"});
raceModel.belongsTo(weaponModel,{foreignKey:"Race_id"});
weaponModel.belongsTo(raceModel,{as:"razas",foreignKey:"Race_id"});


export default raceModel;