import { Router } from "express";
import {
  loginUser,
  createNewUser,
  purchaseHistory,
  getUserFromDb,
  deleteUser
} from "../controllers/usersController.js";

const router = Router();

router.get("/users", getUserFromDb)
router.get("/orders/user/:userId", purchaseHistory);
router.post("/register", createNewUser);
router.post("/login", loginUser);
router.delete("/user/:id", deleteUser)
//router.put("/user", editUser);
//router.get("/user/:id", gerUserForId)
export default router;
