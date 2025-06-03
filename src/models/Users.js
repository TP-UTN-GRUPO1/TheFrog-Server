import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },

    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    adress: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
    },
    province: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: true }
);
