import express from "express";
import dotenv from "dotenv";
import {
  getApplication,
  insertApplication,
  getApplicationByUserId,
} from "../controllers/application_controller";
import { authMiddleware } from "../middleware/authMiddleware";

dotenv.config();

const router = express.Router();

router.get("/getApplication", getApplication);

router.get("/getApplication/:userId", authMiddleware, getApplicationByUserId);

router.post("/insertApplication", authMiddleware, insertApplication);

export default router;
