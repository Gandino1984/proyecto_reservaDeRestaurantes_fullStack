import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";


const MesasModel = sequelize.define("mesas",
    {
        Mesa_id:{
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull:false,
            primaryKey:true,
        },
        Restaurante_id: {
            type: DataTypes.INTEGER,
            allowNull:false,
        },
        Sillas: {
            type: DataTypes.INTEGER,
            allowNull:false
        }        
    }
)
/* mesasModel.belongsTo(userModel,{as:"usuario",foreignKey:"User_id"});
userModel.hasMany(mesasModel,{foreignKey:"User_id"});
mesasModel.belongsTo(weaponModel,{as:"arma",foreignKey:"Weapon_id"});
weaponModel.hasMany(mesasModel,{foreignKey:"Weapon_id"}); */

export default MesasModel;