import express from "express";
import dotenv from "dotenv";
import { userSignup, userLogin } from "../controllers/auth_controller";
import { loginLimiter, signupLimiter } from "../middleware/rateLimiters";

dotenv.config();

const router = express.Router();

router.post("/signup", signupLimiter, userSignup);
router.post("/login", loginLimiter, userLogin);

export default router;
