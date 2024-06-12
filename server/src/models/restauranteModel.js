import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";
import userModel from "./userModel.js";

const RestauranteModel = sequelize.define("restaurante",
    {
        Restaurante_id:{
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull:false,
            primaryKey:true,
        },
        Name: {
            type: DataTypes.STRING(45),
            allowNull:false,
        },
        Hora_Apertura: {
            type: DataTypes.TIME,
            allowNull:false
        },
        Hora_Cierre: {
            type: DataTypes.TIME,
            allowNull:false
        },
        User_id: {
            type: DataTypes.INTEGER,
            allowNull:false
        }      
    }
)

RestauranteModel.belongsTo(userModel,{as:"users",foreignKey:"User_id"});
userModel.hasMany(RestauranteModel,{foreignKey:"User_id"});

export default RestauranteModel;