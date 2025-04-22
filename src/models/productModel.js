// models/Product.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Asegurate de tener tu archivo de conexión a la base de datos

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  platform: {
    type: DataTypes.STRING,
    allowNull: false
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: true
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: true, // crea columnas createdAt y updatedAt
  tableName: 'products'
});

module.exports = Product;
