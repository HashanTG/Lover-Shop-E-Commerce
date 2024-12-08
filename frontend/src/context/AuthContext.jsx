import React, { createContext, useState, useContext } from "react";

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider component to wrap your app
export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(() => {
        return localStorage.getItem("authToken") || null;
    });

    // Function to save token
    const login = (token) => {
        setAuthToken(token); // Save the token
        localStorage.setItem("authToken", token); // Optional: Persist to localStorage
    };

    // Function to clear token (logout)
    const logout = () => {
        setAuthToken(null); // Clear the token
        localStorage.removeItem("authToken"); // Optional: Remove from localStorage
    };

    // Provide token and actions to children
    return (
        <AuthContext.Provider value={{ authToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook for consuming the AuthContext
export const useAuth = () => useContext(AuthContext);
