import { Request, Response } from "express";
import {
  checkIfApplicationExists,
  insertUserApplication,
  getUserApplication,
  deleteUserApplication,
} from "../models/application_models";
import app from "../server";

export const insertApplication = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId, 10);

    const {
      companyName,
      positionApplied,
      dateApplied,
      progress,
      interviewDate,
    } = req.body;

    if (!companyName || !positionApplied || !dateApplied) {
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

export const getApplication = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId, 10);

    const getApplicationByUserId = await getUserApplication(userId);

    res.status(200).json({
      message: "Application fetched successfully",
      application: getApplicationByUserId,
    });
  } catch (error) {
    console.error("Error fetching application by user ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteApplication = async (req: Request, res: Response) => {
  try {
    const applicationId = parseInt(req.params.applicationId, 10);

    const applicationExists = await checkIfApplicationExists(applicationId);

    if (!applicationExists) {
      res.status(404).json({ error: "Application details not found" });
      return;
    }

    const deleteApplicationById = await deleteUserApplication(applicationId);

    res.status(200).json({
      message:
        "Application with ID " + applicationId + " was deleted successfully",
      deleted_application: deleteApplicationById,
    });
  } catch (error) {
    console.error("Error deleting application:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
