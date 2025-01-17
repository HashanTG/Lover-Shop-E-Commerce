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

//Add item to cart
export const addToCartApi = async (productId, quantity) => {
  try {
    const response = await axios.post("http://localhost:8080/api/cart/add", // Direct URL
      {productId,quantity},
      { withCredentials: true } // Include credentials (cookies) in the request
    );

    return response.data; // Return the response data (adjust as per API response)
  } catch (error) {
    console.error("Error adding item to cart:", error);
    throw new Error(error.response?.data?.message || "Failed to add item to cart");
  }
};

