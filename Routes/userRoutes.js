import express from "express";
import {
  authUser,
  registerUser,
} from "../controllers/UserControllers.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.post("/login", authUser);

export default router;
