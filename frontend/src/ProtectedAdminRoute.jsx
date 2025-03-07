import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { checkAdmin } from "./api/authService"; // Import the checkAdmin function

const ProtectedAdminRoute = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(null); // `null` means "not yet determined"
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchAdminStatus = async () => {
      try {
        const adminStatus = await checkAdmin();
        setIsAdmin(adminStatus);
      } catch (error) {
        console.error("Error checking admin status:", error);
        setIsAdmin(false); // Assume false on error
      } finally {
        setIsLoading(false); // Loading complete
      }
    };

    fetchAdminStatus();
  }, []);

  const isAuthenticatedLocal = localStorage.getItem("isAuthenticated") === "true";

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  // If not authenticated, redirect to login
  if (!isAuthenticatedLocal) {
    return <Navigate to="/login" replace />;
  }

  // If not an admin, redirect to homepage
  if (!isAdmin) {
    console.log("User is not an admin");
    return <Navigate to="/" replace />;
  }

  
  return children;
};

export default ProtectedAdminRoute;
