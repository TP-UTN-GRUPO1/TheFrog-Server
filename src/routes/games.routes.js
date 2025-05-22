import { Router } from "express";
import {createGames, getGamesFromDb, deleteGame, findGame,addGameFromArchive, getAllGamesOrByName} from "../controllers/gamesController.js"
import { loadGenresAndPlatform ,getPlatformsAndGenres} from "../controllers/platformGenresController.js";

const router = Router()

router.get("/games", getGamesFromDb)
router.post("/games",createGames)
router.post("/addGenresPlatform", loadGenresAndPlatform)
router.delete("/games/:id", deleteGame)
router.get("/games/:id",findGame)
// router.put("/games/:id",)
 router.get("/platformAndGenres", getPlatformsAndGenres)
 router.get("/addGames",addGameFromArchive)
 router.get("/game", getAllGamesOrByName); // http://localhost:3000/games?name=

export default router;