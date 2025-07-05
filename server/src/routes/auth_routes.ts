import express from "express";
import dotenv from "dotenv";
import { userSignup, userLogin } from "../controllers/auth_controller";

dotenv.config();

const router = express.Router();

router.post("/signup", userSignup);
router.post("/login", userLogin);

export default router;
