import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

/**
 * @module src/models/mapModel
 */

/**
 * Defines the map model with attributes such as Map_id, Name, Race_id.
 */
const mapModel = sequelize.define("Map",
    {
        Map_id:{
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
        Name: {
            type:DataTypes.STRING(45),
            allowNull:false
        },
        Race_id:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
    }
)


export default mapModel;