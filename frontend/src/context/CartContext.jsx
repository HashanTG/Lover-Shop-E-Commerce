import React, { createContext, useState, useEffect } from 'react';

// Create the CartContext
export const CartContext = createContext();

// CartContext provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication status

  // Simulate API call for logged-in user (replace with actual API logic)
  const fetchCartData = async () => {
    if (isAuthenticated) {
      try {
        const response = await fetch('/api/cart'); // Replace with your API endpoint
        const data = await response.json();
        setCartItems(data.items); // Assuming the API response contains an array of items
        setCartItemCount(data.items.length); // Set cart item count
      } catch (error) {
        console.error('Failed to fetch cart data', error);
      }
    }
  };

  // Simulate authentication check (for demonstration)
  useEffect(() => {
    // Replace with actual login check logic
    const token = localStorage.getItem('authToken'); // Example: check for an auth token
    if (token) {
      setIsAuthenticated(true); // If the user is authenticated, set the status to true
    }

    // Fetch cart data if the user is logged in
    fetchCartData();
  }, [isAuthenticated]); // Run when authentication status changes

  return (
    <CartContext.Provider value={{ cartItems, cartItemCount, isAuthenticated }}>
      {children}
    </CartContext.Provider>
  );
};
