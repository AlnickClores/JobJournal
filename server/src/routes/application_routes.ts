import express from "express";
import dotenv from "dotenv";
import {
  insertApplication,
  getApplication,
  deleteApplication,
} from "../controllers/application_controller";
import { authMiddleware } from "../middleware/authMiddleware";

dotenv.config();

const router = express.Router();

router.get("/getApplication/:userId", authMiddleware, getApplication);

router.post("/insertApplication/:userId", authMiddleware, insertApplication);

router.delete(
  "/deleteApplication/:applicationId",
  authMiddleware,
  deleteApplication
);

export default router;
