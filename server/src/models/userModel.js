import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";


/**
 * @module src/models/userModel
 */

/**
 * Defines the user model with attributes such as User_id, Name, Is_Admin, Email, Password.
 */
const userModel = sequelize.define("User",
    {
        User_id:{
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
        Name: {
            type:DataTypes.STRING(45),
            allowNull:false
        },
        Is_Admin: {
            type:DataTypes.TINYINT,
            allowNull:false,
        },
        Email:{
            type:DataTypes.STRING(45),
            allowNull:false,
            primaryKey:true,
        },
        Password:{
            type:DataTypes.STRING(80),
            allowNull:false
        }
    }
)



export default userModel;