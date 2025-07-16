import rateLimit from "express-rate-limit";

export const signupLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 3,
  message: "Too many signup attempts, please try again later.",
});

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many requests, please try again after 15 mins.",
});
