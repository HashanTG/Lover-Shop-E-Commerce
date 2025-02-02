import axios from "axios";
import { config } from "../config";

const API_URL = `${config.apiUrl}/api/reviews`;

export const getRreviews = async (productId) => {
  try {
    const response = await axios.get(`${API_URL}/product/${productId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const addReview = async (review) => {
  try {
    const response = await axios.post(`${API_URL}`, review, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}