import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";


export const Role = sequelize.define("role",{
    idRole: {
        type: DataTypes.INTEGER ,
        primaryKey: true,
        allowNull: false,  
    },
    role:{
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
        defaultValue: "user",
    }
}, { timestamps:false })