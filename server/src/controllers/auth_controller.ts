import { Request, Response } from "express";
import { createUser, checkIfUserExists } from "../models/auth_model";
import { hashPassword } from "../service/hashPassword";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const userSignup = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const userExists = await checkIfUserExists(username);
    if (userExists) {
      res.status(409).json({ error: "Username already exists" });
      return;
    }

    const hashed = await hashPassword(password);
    await createUser(username, hashed);

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error during user signup:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const userLogin = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await checkIfUserExists(username);

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      message: "User logged in successfully",
      user: {
        id: user.id,
        username: user.username,
        created_at: user.created_at,
      },
      token: token,
    });
    return;
  } catch (error) {
    console.error("Error during user login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
