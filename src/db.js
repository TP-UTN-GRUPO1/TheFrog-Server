import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: "./videogames.db",
    logging: false,  // si esta en true muestra los logs de las consultas en la consola
    
})