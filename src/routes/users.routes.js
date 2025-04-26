import { Router } from "express";
import {createNewUser} from "../controllers/usersController.js"

const router = Router()

router.post("/user",createNewUser)

export default router;