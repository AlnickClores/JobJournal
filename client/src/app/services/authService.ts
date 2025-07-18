import axios from "axios";

const API_BASE_URL = "http://localhost:3030/auth";

export const signup = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error during signup:", error);
    throw error;
  }
};

export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      username,
      password,
    });
    sessionStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export const validateToken = async () => {
  const token = sessionStorage.getItem("token");
  try {
    if (!token) {
      console.error("No token found, redirecting to login page.");
      return;
    }

    const response = await axios.get("http://localhost:3030/api/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error validating the token.", error);
    throw error;
  }
};
