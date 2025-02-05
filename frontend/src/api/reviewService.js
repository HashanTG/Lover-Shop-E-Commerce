import axios from "axios";
import { config } from "../config";

const API_URL = `${config.apiUrl}/api/reviews`;

export const getRreviews = async (productId,page=0) => {
  try {
    const response = await axios.get(`${API_URL}/product/${productId}?page=${page}`);
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

export const getAllReviews = async () => {
  try {
    const respone = await axios.get(API_URL, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    return respone;
  } catch (error) {
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
