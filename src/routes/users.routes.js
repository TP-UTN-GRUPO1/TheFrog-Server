import { Router } from "express";
import {
  loginUser,
  createNewUser,
  purchaseHistory,
  getUserFromDb,
  deleteUser
} from "../controllers/usersController.js";
import { authenticate } from "../middleware/authenticate.js";
import { authorize } from "../middleware/authorize.js";
const router = Router();

router.get("/users", authenticate, authorize("sysadmin"),getUserFromDb)
router.get("/orders/user/:userId",authenticate, authorize("sysadmin","admin"), purchaseHistory);
router.post("/register", createNewUser);
router.post("/login", loginUser);
router.delete("/user/:id", authenticate, authorize("sysadmin","admin"),deleteUser)
//router.put("/user", editUser);
//router.get("/user/:id", gerUserForId)
export default router;
