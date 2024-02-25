import express from "express";

import { getCategories, getProductById, getProductsByCategoryId } from "../controllers/ProductControllers.js";
import { protect } from "../middleware/AuthMiddleware.js";


const router = express.Router();
//These all routes are protected 
router.get("/categories", protect , getCategories);
router.get("/categories/:category_id/products", protect ,getProductsByCategoryId);
router.get("/product/:product_id", protect ,  getProductById);

export default router;
