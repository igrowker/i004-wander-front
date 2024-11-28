import axios from "axios";

const BACK_URL = import.meta.env.VITE_API_URL;

export const getExperienceById = async (id: string) => {
  try {
    const response = await axios.get(`${BACK_URL}/experiences/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching experience:", error);
    throw error;
  }
};
