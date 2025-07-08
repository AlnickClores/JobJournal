import { Request, Response } from "express";
import {
  getUserApplication,
  insertUserApplication,
  getApplicationById,
} from "../models/application_models";

export const insertApplication = async (req: Request, res: Response) => {
  try {
    const {
      userId,
      companyName,
      positionApplied,
      dateApplied,
      progress,
      interviewDate,
    } = req.body;

    if (
      !userId ||
      !companyName ||
      !positionApplied ||
      !dateApplied ||
      !progress
    ) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }

    const newApplication = await insertUserApplication(
      userId,
      companyName,
      positionApplied,
      dateApplied,
      progress,
      interviewDate
    );

    if (!newApplication) {
      res.status(500).json({ error: "Failed to insert application" });
      return;
    }

    res.status(201).json({
      message: "Application inserted successfully",
      application: {
        userId,
        companyName,
        positionApplied,
        dateApplied,
        progress,
        interviewDate,
      },
    });
  } catch (error) {
    console.error("Error inserting application:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getApplicationByUserId = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId, 10);

    const getApplicationByUserId = await getApplicationById(userId);

    res.status(200).json({
      message: "Application fetched successfully",
      application: getApplicationByUserId,
    });
  } catch (error) {
    console.error("Error fetching application by user ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getApplication = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    const getApplications = await getUserApplication(userId);

    if (!getApplications) {
      res.status(404).json({ error: "No applications found for this user" });
      return;
    }
    res.status(200).json({
      message: "Applications fetched successfully",
      applications: getApplications,
    });
  } catch (error) {
    console.error("Error fetching application:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
