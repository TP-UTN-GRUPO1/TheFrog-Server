import { Router } from "express";
import { loginUser, createNewUser } from "../controllers/usersController.js"

const router = Router()

router.post("/register", createNewUser);
router.post("/login", loginUser);

export default router;