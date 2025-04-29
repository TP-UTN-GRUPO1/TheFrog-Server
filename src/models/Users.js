import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";


export const User = sequelize.define("user",{
   
    id: {
        type: DataTypes.INTEGER ,
        primaryKey: true,
        allowNull: false,  
    },
    dni:{
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique:true,
        allowNull: false,
        validate: {
            isEmail: true,
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    rol: {
        type: DataTypes.STRING,
        DefaultValue  : "user",
    },
  }
}, { timestamps: true })