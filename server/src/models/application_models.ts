import pool from "../config/database";
import { RowDataPacket } from "mysql2";

export const insertUserApplication = async (
  user_id: number,
  companyName: string,
  positionApplied: string,
  dateApplied: string,
  progress: string,
  interviewDate: string
) => {
  const sql =
    "INSERT INTO applications (user_id, company_name, position_applied, date_applied, progress, interview_date) VALUES (?, ?, ?, ?, ?, ?)";
  const [result] = await pool.query(sql, [
    user_id,
    companyName,
    positionApplied,
    dateApplied,
    progress,
    interviewDate,
  ]);

  return result;
};

export const getUserApplication = async (applicationId: number) => {
  const sql = "SELECT * FROM applications WHERE user_id = ?";
  const [rows] = await pool.query(sql, [applicationId]);

  return rows;
};

export const deleteUserApplication = async (applicationId: number) => {
  const sql = "DELETE FROM applications WHERE id = ?";
  const [result] = await pool.query(sql, [applicationId]);

  return result;
};

export const checkIfApplicationExists = async (applicationId: number) => {
  const sql = "SELECT * FROM applications WHERE id = ?";
  const [rows] = await pool.query<RowDataPacket[]>(sql, [applicationId]);

  return rows.length > 0 ? rows[0] : null;
};
