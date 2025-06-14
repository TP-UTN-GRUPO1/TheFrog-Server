import { Router } from "express";
import {
  createOrder,
  historialUserBuy,
} from "../controllers/orderController.js";

const router = Router();

router.post("/orders", createOrder);
router.get("/historyBuy", historialUserBuy);
export default router;
