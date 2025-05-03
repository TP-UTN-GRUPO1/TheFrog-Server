import express from "express";
import cors from "cors";
import { PORT } from "./config.js";
import { sequelize } from "./db.js";

import "./models/Games.js";
import "./models/Users.js";
import "./models/Genre.js";
import "./models/Platform.js";
import "./models/Roles.js";
import "./models/relations.js"; 

import gamesRoutes from "./routes/games.routes.js";
import usersRoutes from "./routes/users.routes.js";
import { loadGenresAndPlatform } from "./controllers/platformGenresController.js";

const app = express();
app.use(cors());
app.use(express.json());

// cofniguracion de rutas
app.use(gamesRoutes);
app.use(usersRoutes);
/*mas que nada aca cuando nos traemos ejemploRoutes lo que haces es traernos todas las rutas /ejemplo y sus metodos para podes utulizarlos
mas que nada tmb para mantener un orden , buenas practicas y un clean code , igual meter 100 comentarios no se que tan bueno es*/

// lo meti en un func para manejar errores de manera mas facil y despues los await son para esperar la sincronizacion de la base de datos y la carga de datos iniciales antes de iniciar el servidor
const startServer = async () => {
  try {
    // Sincronizar la base de datos
    await sequelize.sync(); // { force: true } para resetear la BD
    console.log("DB connect ✅✅✅");
    
    // Cargar datos iniciales
    await loadGenresAndPlatform();
    console.log("Genres and platforms loaded ✅✅✅");
    
    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`✅ Server listening on http://localhost:${PORT}`);
    });
    
  } catch (error) {
    console.error("There was an error on initialization ❌", error);
    
  }
};

// Iniciar la aplicación
startServer();