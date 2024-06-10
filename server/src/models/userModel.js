import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

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
        },
        Is_Client: {
            type:DataTypes.TINYINT,
            allowNull:false,
        },
    }
)



export default userModel;