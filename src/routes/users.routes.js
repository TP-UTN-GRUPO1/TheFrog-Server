import { Router } from "express";
import {
  loginUser,
  createNewUser,
  purchaseHistory,
} from "../controllers/usersController.js";

const router = Router();

router.post("/register", createNewUser);
router.post("/login", loginUser);
router.get("/orders/user/:userId", purchaseHistory);
//router.put("/user", editUser);
//router.delete("/user/:id", deleteUser)
//router.get("/users", getUsers)
//router.get("/user/:id", gerUserForId)
export default router;
