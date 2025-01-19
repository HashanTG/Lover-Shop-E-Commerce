import React, { createContext, useState, useEffect, useContext } from "react";
import { checkAuthStatus, logoutUser } from "../api/authService";

import { useUserDetail } from "./UserDetailContext";
import { useWishlist } from "./WishlistContext";

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider component to wrap your app
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { fetchUserDetail } = useUserDetail();
  const { fetchWishlistItems } = useWishlist();

  // Check if the user is authenticated on mount
  useEffect(() => {
    const storedAuthStatus = localStorage.getItem("isAuthenticated");
    if (storedAuthStatus === "true") {
      setIsAuthenticated(true);
      fetchAndPopulateUserDetails();
    } else {
      // Check authentication status from backend
      const checkAuth = async () => {
        const authStatus = await checkAuthStatus();
        if (authStatus) {
          console.log("User is authenticated");
          setIsAuthenticated(true);
          fetchAndPopulateUserDetails();

          localStorage.setItem("isAuthenticated", "true"); // Persist in localStorage
        } else {
          console.log("User is not authenticated");
          setIsAuthenticated(false);
          localStorage.setItem("isAuthenticated", "false"); // Persist in localStorage
        }
      };

      checkAuth();
    }
  }, []);

  // Function to log in (for use when the user is authenticated)
  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true"); // Persist in localStorage
  };

  // Function to log out (clear the token, etc.)
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem("isAuthenticated", "false"); // Clear authentication status in localStorage
    logoutUser(); // Call the logout service function
  };

  // Function to fetch and populate user details
  const fetchAndPopulateUserDetails = async () => {
    try {
      const userDetails = await fetchUserDetail(); // Call backend API to fetch user details
      const wishlist = await fetchWishlistItems(); // Call backend API to fetch wishlist
      if (userDetails) {
        console.log("User details fetched and populated");
        console.log(userDetails);
      } else {
        console.warn("Failed to fetch user details");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  // Provide auth status and actions to children
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook for consuming the AuthContext
export const useAuth = () => useContext(AuthContext);
