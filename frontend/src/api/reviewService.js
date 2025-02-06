import axios from "axios";
import { config } from "../config";

const API_URL = `${config.apiUrl}/api/reviews`;

export const getRreviews = async (productId,page=0,size=10) => {
  try {
    const response = await axios.get(`${API_URL}/product/${productId}?page=${page}&size=${size}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addReview = async (review) => {
  try {
    const response = await axios.post(`${API_URL}`, review, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

//ADMIN

export const getAllReviews = async (page = 0, size = 10) => {
  try {
    const response = await axios.get(`${API_URL}?page=${page}&size=${size}`, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    return response.data;  // Return only the response data
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};


export const replyReview = async (reviewId, reply) => {
  try {
    const response = await axios.put(
      `${API_URL}/${reviewId}/reply`,
      reply,
      {
        withCredentials: true,
        headers: { "Content-Type": "text/plain" },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
