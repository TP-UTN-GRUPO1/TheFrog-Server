import express from "express"
import cors from "cors"
import { PORT } from "./config.js";
import { sequelize } from "./db.js";

import "./models/Games.js"
import "./models/Users.js"
import "./models/Genre.js"
import "./models/Platform.js"

import gamesRoutes from "./routes/games.routes.js";
import usersRoutes from "./routes/users.routes.js";

const app =express();
app.use(cors());
app.use(express.json())

try {

    app.listen(PORT);
    app.use(gamesRoutes);
    app.use(usersRoutes)

    await sequelize.sync() // si agregamos { force: true } dentro del sycn limpia la bd
        .then(()=> console.log("DB connect ✅✅✅"))
        .catch(error => console.error("error when synchronizing DB ❌❌❌", error))


    console.log(`✅ Server listening on http://localhost:${PORT}`);
} catch (error) {
    console.log(`There was an error on initialization ❌`, error)
}

