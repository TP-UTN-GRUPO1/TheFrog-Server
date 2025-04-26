import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Platform = sequelize.define("platform",{
   
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    platformName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
    }
}, { timestamps: false 
})