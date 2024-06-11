import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";


const reservasModel = sequelize.define("Reservas",
    {
        Reservas_id:{
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull:false,
            primaryKey:true,
        },
        User_id: {
            type: DataTypes.INTEGER,
            allowNull:false,
        },
        Date: {
            type:DataTypes.DATE,
            allowNull:false
        },
        Hora_Inicio:{
            type:DataTypes.TIME,
            allowNull:false,
        },
        Hora_Final:{
            type:DataTypes.TIME,
            allowNull:false,
        },
        Is_accepted:{
            type:DataTypes.TINYINT,
            allowNull:false,
        },
        Mesa_id:{
            type:DataTypes.INTEGER,
            //allowNull:false,
        },
        Name:{
            type:DataTypes.STRING(45),
            allowNull:false,
        }
        
    }
)
/* reservasModel.belongsTo(userModel,{as:"usuario",foreignKey:"User_id"});
userModel.hasMany(reservasModel,{foreignKey:"User_id"});
reservasModel.belongsTo(weaponModel,{as:"arma",foreignKey:"Weapon_id"});
weaponModel.hasMany(reservasModel,{foreignKey:"Weapon_id"}); */

export default reservasModel;