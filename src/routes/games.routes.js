import { Router } from "express";
import {createGames, getGamesFromDb} from "../controllers/gamesController.js"
import { loadGenresAndPlatform } from "../controllers/platformGenresController.js";


const router = Router()


router.get("/games", getGamesFromDb)
router.post("/games",createGames)
router.post("/addGenresPlatform", loadGenresAndPlatform)
// router.get("/games/:id",)
// router.put("/games/:id",)
// router.delete("/games/:id",)


export default router;