import express from "express";
import { createProduct } from "../controllers/MetaControllers.js";
const router = express.Router();

router.post("/createproducts", createProduct);

export default router ;
