import React, { createContext, useState, useEffect, useContext } from "react";
import { checkAuthStatus, logoutUser,checkAdmin } from "../api/authService"; //Service for Api Requests

import { useUserDetail } from "./UserDetailContext"; 
import { useWishlist } from "./WishlistContext";

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider component to wrap your app
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { fetchUserDetail } = useUserDetail();
  const { fetchWishlistItems } = useWishlist();
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if the user is authenticated on mount
  useEffect(() => {
    // Check authentication status from backend
    const checkAuth = async () => {
      try {
        // First, check if the user is authenticated
        const authStatus = await checkAuthStatus();
        if (authStatus) {
          console.log("User is authenticated");
          setIsAuthenticated(true);
          fetchAndPopulateUserDetails();
  
          // After confirming the user is authenticated, check if the user is an admin
          const adminStatus = await checkAdmin();
          console.log("Admin status:", adminStatus);
          setIsAdmin(adminStatus);
  
          localStorage.setItem("isAuthenticated", "true"); // Persist in localStorage
        } else {
          console.log("User is not authenticated");
          setIsAuthenticated(false);
          setIsAdmin(false); // Reset admin status if not authenticated
          localStorage.setItem("isAuthenticated", "false"); // Persist in localStorage
        }
      } catch (error) {
        console.error("Error during authentication or role check:", error);
        setIsAuthenticated(false);
        setIsAdmin(false);
      }
    };
  
    checkAuth();
  }, []);
  

// Function to log in (for use when the user is authenticated)
const login = async () => {
  setIsAuthenticated(true);
  localStorage.setItem("isAuthenticated", "true"); // Persist in localStorage

  try {
    await fetchAndPopulateUserDetails();
    const adminStatus = await checkAdmin();
    console.log("Admin status:", adminStatus);
    setIsAdmin(adminStatus);
  } catch (error) {
    console.error("Error fetching user/admin details:", error);
  }
};

// Function to log out (clear the token, etc.)
const logout = () => {
  setIsAuthenticated(false);
  setIsAdmin(false);
  localStorage.removeItem("isAuthenticated"); // Remove from localStorage
  logoutUser(); // Call the logout service function
};


  // Function to fetch and populate user details
  const fetchAndPopulateUserDetails = async () => {
    try {
      const [userDetails, wishlist] = await Promise.allSettled([fetchUserDetail(), fetchWishlistItems()]);
  
      if (userDetails.status === "fulfilled") {
        console.log("User details fetched");
      } else {
        console.warn("Failed to fetch user details");
      }
  
      if (wishlist.status === "fulfilled") {
        console.log("Wishlist fetched");
      } else {
        console.warn("Failed to fetch wishlist");
      }
    } catch (error) {
      console.error("Unexpected error during API calls", error);
    }
  };


  // Provide auth status and actions to children
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook for consuming the AuthContext
export const useAuth = () => useContext(AuthContext);
