import { Router } from "express";
import {createGames, getGamesFromDb} from "../controllers/gamesController.js"


const router = Router()


router.get("/games", getGamesFromDb)
router.post("/games",createGames)
// router.get("/games/:id",)
// router.put("/games/:id",)
// router.delete("/games/:id",)


export default router;