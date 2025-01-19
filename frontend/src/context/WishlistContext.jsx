import React, { createContext, useState, useContext } from "react";
import { getWishList } from "../api/wishListService";

// Create the WishlistContext
const WishlistContext = createContext();

// WishlistProvider component to wrap your app
export const WishlistProvider = ({ children }) => {
    const [wishlistItems, setWishlistItems] = useState([]);

    // Fetch wishlist items from backend on mount
    const fetchWishlistItems = async () => {
        try {
            const items = await getWishList();
            setWishlistItems(items);
        } catch (error) {
            console.error("Error fetching wishlist items:", error);
        }
    }

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
        <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, clearWishlist,fetchWishlistItems }}>
            {children}
        </WishlistContext.Provider>
    );
};

// Hook for consuming the WishlistContext
export const useWishlist = () => useContext(WishlistContext);
