const { Sequelize } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../database.sqlite'), // aca creo que creaba el archivo sqlite osea la bbdd liviana 
  logging: false // si esta en true podemos ver las consultas sql en consola ojota a eso
});

module.exports = sequelize;
