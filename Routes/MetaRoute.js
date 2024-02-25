import express from "express";
import { createCategory, createProduct } from "../controllers/MetaControllers.js";
const router = express.Router();

router.post("/creataecategories", createCategory);
router.post("/createproducts", createProduct);

export default router ;
