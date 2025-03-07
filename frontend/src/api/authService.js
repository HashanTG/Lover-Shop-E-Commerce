import axios from "axios";
import { config } from "../config";

const URL = `${config.apiUrl}/api/auth`;; //URL

//Register a new user
export const registerUser = async (data) => {
  try {
    const response = await axios.post(`${URL}/register`, data);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "An error occurred during registration.",
      }
    );
  }
};

//Login a user
export const loginUser = async (data) => {
  try {
    const response = await axios.post(
      `${URL}/login`,
      data,
      { withCredentials: true } // Include cookies in the request/response
    );
    console.log(response);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Invalid credentials." };
  }
};

//Check Authentication status
export const checkAuthStatus = async () => {
  try {
    const response = await axios.get(`${URL}/status`, {
      withCredentials: true,
    });
    if (response.status === 200 && response.data === "Authenticated") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export const logoutUser = async () => {
  try {
    const response = await axios.post(
      `${URL}/logout`,
      {},
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || { message: "An error occurred during logout." }
    );
  }
};

//Check For admin

export const checkAdmin = async (token) => {
  try {
    const response = await axios.get(`${URL}/role-status`, {withCredentials: true});

    // Assuming the response contains a 'role' field that tells us if the user is an admin
    if (response.data === "ADMIN") {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
};