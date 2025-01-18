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

export const getNewArrivals = async () => {
    try {
      const response = await axios.get(`${API_URL}/new-arrivals`);
      console.log("API response:", response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching new arrivals:', error);
      throw error;
    }
  }

export const getCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/categories`);
      console.log("API response:", response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }
  export const searchProducts = async ({ searchQuery, category, minPriceVal, maxPriceVal }) => {
    try {
      // Construct query parameters dynamically
      
      console.log("searchQuery", searchQuery, "category", category, "minPriceVal", minPriceVal, "maxPriceVal", maxPriceVal);

      const queryParams = new URLSearchParams();
  
      if (searchQuery) queryParams.append("name", searchQuery);
      if (category) queryParams.append("category", category);
      if (minPriceVal !== undefined) queryParams.append("minPrice", minPriceVal);
      if (maxPriceVal !== undefined) queryParams.append("maxPrice", maxPriceVal);
  
      const apiUrl = `${API_URL}/filter?${queryParams.toString()}`;
      console.log("Searching products with query:", queryParams.toString());
      console.log("API URL:", apiUrl);
  
      const response = await axios.get(apiUrl);
  
      console.log("API response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error searching products:", error);
      throw error;
    }
  };
  