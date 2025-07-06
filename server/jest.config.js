module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src/test"],
  testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
};
