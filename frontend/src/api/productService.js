import axios from 'axios'; 

const API_URL = 'http://localhost:8080/api/products'; // Replace with your backend API URL 

export const getProducts = async () => {
    try {
      const response = await axios.get(API_URL);
      console.log("API response:", response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  };
  