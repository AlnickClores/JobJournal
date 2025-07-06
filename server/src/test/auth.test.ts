import request from "supertest";
import app from "../server";

describe("Auth API Tests", () => {
  const testUser = {
    username: "Knotz",
    password: "AkosiKnotz",
  };

  it("should sign up a new user", async () => {
    const res = await request(app).post("auth/signup").send(testUser);
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("User created successfully");
  });

  it("should not allow duplicate user signup", async () => {
    const res = await request(app).post("auth/signup").send(testUser);
    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe("Internal Server Error");
  });

  it("should log in an existing user", async () => {
    const res = await request(app).post("auth/login").send(testUser);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("User logged in successfully");
    expect(res.body.token).toHaveProperty("token");
  });
});
