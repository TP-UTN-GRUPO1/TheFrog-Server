import { Router } from "express";
import {createGames, getGamesFromDb, deleteGame, findGame} from "../controllers/gamesController.js"
import { loadGenresAndPlatform } from "../controllers/platformGenresController.js";


const router = Router()


router.get("/games", getGamesFromDb)
router.post("/games",createGames)
router.post("/addGenresPlatform", loadGenresAndPlatform)
router.delete("/games/:id", deleteGame)
router.get("/games/:id",findGame)
// router.put("/games/:id",)


export default router;