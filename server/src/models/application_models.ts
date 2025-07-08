import pool from "../config/database";

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

export const getUserApplication = async (userId: number) => {
  const sql = "SELECT * FROM applications WHERE user_id = ?";
  const [rows] = await pool.query(sql, [userId]);

  return rows;
};

export const getApplicationById = async (applicationId: number) => {
  const sql = "SELECT * FROM applications WHERE user_id = ?";
  const [rows] = await pool.query(sql, [applicationId]);

  return rows;
};
