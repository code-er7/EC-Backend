import express from "express";
import { protect } from "../middleware/AuthMiddleware.js";
import { getOrderById, getOrderHistory, placeOrder } from "../controllers/OrdeController.js";
const router = express.Router();


router.put("/place" , protect , placeOrder);
router.get("/history", protect , getOrderHistory);
router.get("/:order_id", protect , getOrderById);

export default router ;