import React, { createContext, useState, useEffect, useContext } from "react";
import { checkAuthStatus, logoutUser } from "../api/authService";

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider component to wrap your app
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check if the user is authenticated on mount
    useEffect(() => {
        const storedAuthStatus = localStorage.getItem("isAuthenticated");
        if (storedAuthStatus === "true") {
            setIsAuthenticated(true);
        } else {
            // Check authentication status from backend
            const checkAuth = async () => {
                const authStatus = await checkAuthStatus();
                if (authStatus) {
                    console.log("User is authenticated");
                    setIsAuthenticated(true);
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

    // Provide auth status and actions to children
    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook for consuming the AuthContext
export const useAuth = () => useContext(AuthContext);
