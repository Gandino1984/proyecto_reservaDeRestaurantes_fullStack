import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";
import RestauranteModel from "./restauranteModel.js";

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
MesasModel.belongsTo(RestauranteModel,{as:"restaurante",foreignKey:"Restaurante_id"});
RestauranteModel.hasMany(MesasModel,{foreignKey:"Restaurante_id"});

export default MesasModel;