import axios from "axios";
import { config } from "../config";

//Fetch Cart Items

const API_URL =`${config.apiUrl}/api/cart`; //BASE API_URL


export const fetchCartData = async () => {
  try {
    const response = await axios.get(`${API_URL}/details`, {
      withCredentials: true, // Include cookies in the request
    });
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Failed to fetch cart data", error);
    return error;
  }
};

//Add item to cart
export const addToCartApi = async (productId, quantity) => {
  try {
    const response = await axios.post(
      `${API_URL}/add`, // Direct API_URL
      { productId, quantity },
      { withCredentials: true } // Include credentials (cookies) in the request
    );

    return response.data; // Return the response data (adjust as per API response)
  } catch (error) {
    console.error("Error adding item to cart:", error);
    throw new Error(
      error.response?.data?.message || "Failed to add item to cart"
    );
  }
};

export const removeFromCartApi = async (productId) => {
  try {
    const response = await axios.delete(
      `${API_URL}/remove?productId=${productId}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Error removing item from cart:", error);
    throw new Error(
      error.response?.data?.message || "Failed to remove item from cart"
    );
  }
};
