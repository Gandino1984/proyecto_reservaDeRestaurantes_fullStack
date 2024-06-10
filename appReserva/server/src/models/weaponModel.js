import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

/**
 * @module src/models/weaponModel
 */

/**
 * Defines the map model with attributes such as Weapon_id, Name, Damage, Category, Accuracy, Race_id.
 */

const weaponModel = sequelize.define("Weapon",
    {
        Weapon_id:{
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
        Name: {
            type:DataTypes.STRING(45),
            allowNull:false
        },
        Damage: {
            type:DataTypes.INTEGER,
            allowNull:false
        },
        Category: {
            type:DataTypes.STRING(45),
            allowNull:false
        },
        Accuracy: {
            type:DataTypes.INTEGER,
            allowNull:false
        },
        Race_id:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
    }
)


export default weaponModel;