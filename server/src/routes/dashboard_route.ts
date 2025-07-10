import { Request, Response } from "express";
import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/dashboard/", authMiddleware, (req: Request, res: Response) => {
  const tokenUsername = (req as any).user.username;

  res.json({ message: `Welcome ${tokenUsername}`, user: (req as any).user });
  return;
});

export default router;
