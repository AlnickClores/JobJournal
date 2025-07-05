import express from "express";
import dotenv from "dotenv";
import { getAllUsers } from "../controllers/user_controller";

dotenv.config();

const router = express.Router();

router.get("/users", getAllUsers);

export default router;
