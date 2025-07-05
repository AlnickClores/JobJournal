import { RowDataPacket } from "mysql2";
import pool from "../config/database";

export const createUser = async (username: string, password: string) => {
  const sql = "INSERT INTO users (username, password) VALUES (?, ?)";
  const [result] = await pool.query(sql, [username, password]);

  return result;
};

export const checkIfUserExists = async (username: string) => {
  const sql = "SELECT * FROM users WHERE username = ? LIMIT 1";
  const [rows] = await pool.query<RowDataPacket[]>(sql, [username]);

  return rows.length > 0 ? rows[0] : null;
};
