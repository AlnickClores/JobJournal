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

export const insertApplication = async (
  userId: number,
  applicationForm: object
) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await axios.post(
      `${API_BASE_URL}/insertApplication/${userId}`,
      applicationForm,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error inserting application: ", error);
    throw error;
  }
};
