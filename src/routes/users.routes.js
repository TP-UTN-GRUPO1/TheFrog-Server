import { Router } from "express";
import {createNewUser} from "../controllers/usersController.js"

const router = Router()

router.post("/register",createNewUser)
router.post("/login", ()=>{})

export default router;