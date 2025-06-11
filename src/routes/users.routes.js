import { Router } from "express";
import {
  loginUser,
  createNewUser,
  purchaseHistory,
  getUserFromDb,
  deleteUser,updateUserRole
} from "../controllers/usersController.js";
import { authenticate } from "../middleware/authenticate.js";
import { authorize } from "../middleware/authorize.js";
const router = Router();

router.get("/users" ,getUserFromDb)
router.get("/orders/user/:userId", purchaseHistory);
router.post("/register", createNewUser);
router.post("/login", loginUser);
router.delete("/user/:id",deleteUser)
router.put("/users/:id/role", updateUserRole);
//router.get("/user/:id", gerUserForId)
export default router;
