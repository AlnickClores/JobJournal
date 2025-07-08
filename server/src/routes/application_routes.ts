import express from "express";
import dotenv from "dotenv";
import {
  getApplication,
  insertApplication,
  getApplicationByUserId,
} from "../controllers/application_controller";

dotenv.config();

const router = express.Router();

router.get("/getApplication", getApplication);

router.get("/getApplication/:userId", getApplicationByUserId);

router.post("/insertApplication", insertApplication);

export default router;
