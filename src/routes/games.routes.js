import { Router } from "express";
import { createGames,  getGamesFromDb,deleteGame,findGame,addGameFromArchive  ,getAllGamesOrByName,updateGame} from "../controllers/gamesController.js";
import {loadGenresAndPlatform,getPlatformsAndGenres} from "../controllers/platformGenresController.js";
// import { verifyToken } from "../middleware/verifyToken.js";
import { authorize } from "../middleware/authorize.js";
import { verifyToken } from "../utils/auth.js";

const router = Router();

router.get("/games", getGamesFromDb);
router.post("/games", verifyToken, authorize("sysadmin", "admin"), createGames);
router.post("/addGenresPlatform", verifyToken, authorize("admin", "sysadmin"), loadGenresAndPlatform);
router.delete("/games/:id", verifyToken, authorize("admin", "sysadmin"), deleteGame);
router.get("/games/:id", findGame);
router.put("/updateGame/:id", verifyToken, authorize("admin", "sysadmin"), updateGame);
router.get("/platformAndGenres", getPlatformsAndGenres);
router.get("/addGames", verifyToken, authorize("admin", "sysadmin"), addGameFromArchive);
router.get("/game", getAllGamesOrByName); // http://localhost:3000/game?name=


export default router;
