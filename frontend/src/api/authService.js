import axios from "axios";

const BASE_URL = "http://localhost:8080/api/auth";

//Register a new user
export const registerUser = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, data);
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
      `${BASE_URL}/login`,
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
    const response = await axios.get("http://localhost:8080/api/auth/status", {
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
      `${BASE_URL}/logout`,
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
