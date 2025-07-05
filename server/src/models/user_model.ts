import pool from "../config/database";

export const getUsers = async () => {
  const sql = "SELECT * FROM users";
  const [rows] = await pool.query(sql);
  return rows;
};
