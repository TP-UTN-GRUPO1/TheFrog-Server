import { Router } from "express";
import { addFavorites } from "../controllers/favoritesController.js";


const router = Router()

router.post("/favorites", addFavorites)

export default router
