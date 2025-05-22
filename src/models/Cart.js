import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";


export const Cart = sequelize.define("cart",{
    idCart: {
        type: DataTypes.INTEGER ,
        primaryKey: true,
        allowNull: false,  
    },
    description:{
        type: DataTypes.TEXT,
        allowNull: false,
    },
    quantity:{
        type:DataTypes.INTEGER,
        allowNull: false
    },date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'pending'
    },
    total: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0
    },


})