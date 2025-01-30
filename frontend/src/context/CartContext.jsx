import React, { createContext, useState, useEffect, useContext } from 'react';
import { fetchCartData,addToCartApi,removeFromCartApi} from "../api/CartServices"; // Import the service function to fetch cart data
import { useAuth } from './AuthContext'; // Import the useAuth hook to get auth status


// Create the CartContext
export const CartContext = createContext();

// CartContext provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);

  // Get authentication status from AuthContext
  const { isAuthenticated } = useAuth();

  // Fetch cart data if the user is authenticated
  const fetchCart = async () => {
    if (isAuthenticated) {
        try {
            const data = await fetchCartData(); // This should return empty data or error when not authenticated
            setCartItems(data.items || []); // Fallback to empty array
            setCartItemCount(data.items?.length || 0); // Fallback to 0
        } catch (error) {
            console.error("Failed to fetch cart data:", error);
            setCartItems([]); // Clear cart on error
            setCartItemCount(0); // Reset count on error
        }
    } else {
        setCartItems([]); // Clear cart when user logs out
        setCartItemCount(0); // Reset cart item count
    }
};

const addToCart = async (productId, quantity) => {
  if (!isAuthenticated) {
    return { success: false, message: "User not logged in." };
  }

  try {
    // Call the actual service or utility function for adding an item to the cart
    await addToCartApi(productId, quantity); 

    // Refresh the cart context
    await fetchCart();

    return { success: true };
  } catch (error) {
    console.error("Error adding item to cart:", error);
    return { success: false, message: error.message };
  }
};


  // Fetch cart data when the user is authenticated
  useEffect(() => {
    fetchCart();
  }, [isAuthenticated]); // Run when authentication status changes

  const removeFromCart = async (productId) => {
    if (!isAuthenticated) {
      return { success: false, message: "User not logged in." };
    }

    try {
      await removeFromCartApi(productId);
      await fetchCart(); // Refresh the cart after removal
      return { success: true };
    } catch (error) {
      console.error("Error removing item from cart:", error);
      return { success: false, message: error.message };
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, cartItemCount,addToCart, removeFromCart, fetchCart  }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
