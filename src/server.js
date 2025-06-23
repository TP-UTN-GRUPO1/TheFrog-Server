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
import "./models/OrderItem.js";
import "./models/Order.js";

import gamesRoutes from "./routes/games.routes.js";
import usersRoutes from "./routes/users.routes.js";
import favoritesRoutes from "./routes/favorites.routes.js";
import { loadGenresAndPlatform } from "./controllers/platformGenresController.js";
import { User } from "./models/Users.js";
import { Game } from "./models/Games.js";
import { uploadRolesInDb } from "./controllers/usersController.js";
import ordersRoutes from "./routes/order.routes.js";
import platformsRoutes from "./routes/platform.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

// cofniguracion de rutas
app.use(ordersRoutes);
app.use(gamesRoutes);
app.use(usersRoutes);
app.use(favoritesRoutes);
app.use(platformsRoutes);

const startServer = async () => {
  try {
    await sequelize.sync(); // { force: true } para resetear la BD alter:true es para modificar tablas
    console.log("DB connect ✅✅✅");

    //await loadGenresAndPlatform();
    //await uploadRolesInDb();
    //console.log("Genres and platforms loaded ✅✅✅");

    app.listen(PORT, () => {
      console.log(`✅ Server listening on http://localhost:${PORT}/games`);
    });
  } catch (error) {
    console.error("There was an error on initialization ❌", error);
  }
};

startServer();
