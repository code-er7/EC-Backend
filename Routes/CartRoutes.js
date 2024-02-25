import express from "express";
import { protect } from "../middleware/AuthMiddleware.js";
import { addToCart, removeCartItem, updateCartItemQuantity, viewCart } from "../controllers/CartControllers.js";


// Define a route to handle the /cart endpoint
const router = express.Router();
router.get("/" , protect , viewCart);
router.post("/add/:productid", protect, addToCart);
router.patch("/update", protect, updateCartItemQuantity);
router.delete("/remove", protect, removeCartItem);

export default router;
