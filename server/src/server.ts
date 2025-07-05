import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/user_routes";
import authRoutes from "./routes/auth_routes";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/user", userRoutes); // this is just a test route
app.use("/auth", authRoutes);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is running on port ${process.env.SERVER_PORT}`);
});
