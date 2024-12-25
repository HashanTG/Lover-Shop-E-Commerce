import React, { createContext, useState, useEffect, useContext } from 'react';
import { fetchCartData } from "../api/CartServices"; // Import the service function to fetch cart data
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

  // Fetch cart data when the user is authenticated
  useEffect(() => {
    fetchCart();
  }, [isAuthenticated]); // Run when authentication status changes

  return (
    <CartContext.Provider value={{ cartItems, cartItemCount }}>
      {children}
    </CartContext.Provider>
  );
};
