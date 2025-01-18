import React, { createContext, useState, useContext } from "react";

// Create the WishlistContext
const WishlistContext = createContext();

// WishlistProvider component to wrap your app
export const WishlistProvider = ({ children }) => {
    const [wishlistItems, setWishlistItems] = useState([]);

    // Add item to wishlist
    const addToWishlist = (item) => {
        setWishlistItems((prevItems) => [...prevItems, item]);
    };

    // Remove item from wishlist
    const removeFromWishlist = (itemId) => {
        setWishlistItems((prevItems) => prevItems.filter(item => item.id !== itemId));
    };

    // Clear wishlist
    const clearWishlist = () => {
        setWishlistItems([]);
    };

    return (
        <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, clearWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

// Hook for consuming the WishlistContext
export const useWishlist = () => useContext(WishlistContext);
