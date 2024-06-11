import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";


const reservasModel = sequelize.define("Reservas",
    {
        Reserva_id:{
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
        User_id: {
            type: DataTypes.INTEGER,
            allowNull:false,
        },
        Date: {
            type:DataTypes.date,
            allowNull:false
        },
        Hora_Inicio:{
            type:DataTypes.time,
            allowNull:false,
        },
        Hora_Final:{
            type:DataTypes.time,
            allowNull:false,
        },
        Is_accepted:{
            type:DataTypes.TINYINT,
            allowNull:false,
        },
        Mesa_id:{
            type:DataTypes.INTEGER,
            allowNull:false,
        }
    }
)
reservasModel.belongsTo(userModel,{as:"usuario",foreignKey:"User_id"});
userModel.hasMany(reservasModel,{foreignKey:"User_id"});
reservasModel.belongsTo(weaponModel,{as:"arma",foreignKey:"Weapon_id"});
weaponModel.hasMany(reservasModel,{foreignKey:"Weapon_id"});

export default reservasModel;