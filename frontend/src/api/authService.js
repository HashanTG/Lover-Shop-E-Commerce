import axios from "axios";

const BASE_URL = "http://localhost:8080/api/auth";

export const registerUser = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "An error occurred during registration." };
  }
};

export const loginUser = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, data);
    console.log(response);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Invalid credentials." };
  }
};
