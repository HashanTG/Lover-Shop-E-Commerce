import axios from "axios";


//Fetch Cart Items
export const fetchCartData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/cart/details", {
        withCredentials: true, // Include cookies in the request
      });
      const data = response.data;
      return data;
    } catch (error) {
      console.error("Failed to fetch cart data", error);
      return error;
    }
  
};
