import express from "express"

import { PORT } from "./config.js";
import { sequelize } from "./db.js";

import "./models/Games.js"
import "./models/Users.js"
import "./models/Genre.js"
import "./models/Platform.js"

import gamesRoutes from "./routes/games.routes.js";
import usersRoutes from "./routes/users.routes.js";

const app =express();
app.use(express.json())

try {

    app.listen(PORT);
    app.use(gamesRoutes);
    app.use(usersRoutes)

    await sequelize.sync();


    console.log(`✅ Server listening on http://localhost:${PORT}`);
} catch (error) {
    console.log(`There was an error on initialization ❌`, error)
}

