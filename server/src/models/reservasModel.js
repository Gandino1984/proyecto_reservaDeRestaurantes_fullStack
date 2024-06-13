import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";
import userModel from "./userModel.js";
import MesasModel from "./mesasModel.js";

const ReservasModel = sequelize.define("Reservas", {
    Reservas_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
    },
    User_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    Hora_Inicio: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    Hora_Final: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    Is_accepted: {
        type: DataTypes.TINYINT,
        allowNull: false,
    },
    Mesa_id: {
        type: DataTypes.INTEGER,
    },
    Name: {
        type: DataTypes.STRING(45),
        allowNull: false,
    }
});

ReservasModel.belongsTo(userModel, { as: "usuario", foreignKey: "User_id" });
userModel.hasMany(ReservasModel, { foreignKey: "User_id" });

ReservasModel.belongsTo(MesasModel, { as: "mesa", foreignKey: "Mesa_id" });  
MesasModel.hasMany(ReservasModel, { foreignKey: "Mesa_id", as: "reservas" }); 

export default ReservasModel;
