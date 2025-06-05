import { Router } from "express";
import { addFavorites, deleteFavorites, getAllFavorites, getFavoritesByUser } from "../controllers/favoritesController.js";


const router = Router()

router.post("/favorites", addFavorites)
router.delete("/favorites", deleteFavorites)
router.get("/favorites", getAllFavorites)
router.get("/favorites/:id", getFavoritesByUser)


export default router
