import express from "express";
import { createCategory, createProduct } from "../controllers/MetaControllers.js";
import router from "./userRoutes.js";

router.post("/creataecategories", createCategory);
router.post("/createproducts", createProduct);

export default router ;
