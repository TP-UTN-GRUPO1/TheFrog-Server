import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Game = sequelize.define("game",{
   
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nameGame: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    developer: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    platform: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    available: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    price:{
        type:DataTypes.FLOAT,
        allowNull:false
    }
}, { timestamps: true 
})