import { createPlatform } from "../controllers/platformGenresController.js";
import {
  deletePlatforms,
  getPlatforms,
  updatePlatforms,
} from "../controllers/platformGenresController.js";
import { Router } from "express";

const router = Router();

router.post("/platforms", createPlatform);
router.get("/platforms", getPlatforms);
router.put("/platforms/:id", updatePlatforms);
router.delete("/platforms/:id", deletePlatforms);

export default router;
