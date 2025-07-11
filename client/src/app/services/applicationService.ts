import axios from "axios";

const API_BASE_URL = "http://localhost:3030/application";

export const getApplications = async (userId: number) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await axios.get(
      `${API_BASE_URL}/getApplication/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching applications:", error);
    throw error;
  }
};
