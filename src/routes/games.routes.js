import { Router } from "express";
import { createGames,  getGamesFromDb,deleteGame,findGame,addGameFromArchive  ,getAllGamesOrByName,updateGame} from "../controllers/gamesController.js";
import {loadGenresAndPlatform,getPlatformsAndGenres} from "../controllers/platformGenresController.js";
import { authenticate } from "../middleware/authenticate.js";
import { authorize } from "../middleware/authorize.js";

const router = Router();

router.get("/games", getGamesFromDb);
router.post("/games", authenticate, authorize("admin", "sysadmin"), createGames);
router.post("/addGenresPlatform", authenticate, authorize("admin", "sysadmin"), loadGenresAndPlatform);
router.delete("/games/:id", authenticate, authorize("admin", "sysadmin"), deleteGame);
router.get("/games/:id", findGame);
router.put("/updateGame/:id", authenticate, authorize("admin", "sysadmin"), updateGame);
router.get("/platformAndGenres", getPlatformsAndGenres);
router.get("/addGames", authenticate, authorize("admin", "sysadmin"), addGameFromArchive);
router.get("/game", getAllGamesOrByName); // http://localhost:3000/game?name=


export default router;
