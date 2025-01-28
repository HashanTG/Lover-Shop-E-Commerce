import React, { createContext, useState, useContext } from "react";
import { getWishList,removeFromWishlistAPI,addToWishlistAPI } from "../api/wishListService";

// Create the WishlistContext
const WishlistContext = createContext();

// WishlistProvider component to wrap your app
export const WishlistProvider = ({ children }) => {
    const [wishlistItems, setWishlistItems] = useState([]);

    // Fetch wishlist items from backend on mount
    const fetchWishlistItems = async () => {
        try {
            const items = await getWishList();
            setWishlistItems(items.data);
        } catch (error) {
            console.error("Error fetching wishlist items:", error);
        }
    }

// Add item to wishlist
const addToWishlist = async (productId) => {
    try {
      const response = await addToWishlistAPI(productId);
  
      if (response.success) {
        return response;
      } else {
        console.error("Failed to add item to wishlist:", response.message);
        return response;
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      return response;
    }
  };
  
  // Remove item from wishlist
  const removeFromWishlist = async (itemId) => {
    try {
      const response = await removeFromWishlistAPI(itemId);
  
      if (response.success) {
        // Update local wishlist state after successful removal
        setWishlistItems((prevItems) =>
          prevItems.filter((item) => item.id !== itemId)
        );

        return response;
      } else {
        console.error("Failed to remove item from wishlist:", response.message);
        return response;
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      return response;
    }
  };
  
  // Clear wishlist
//   const clearWishlist = async () => {
//     try {
//       const response = await clearWishlistAPI();
  
//       if (response.success) {
//         // Clear the local wishlist state
//         setWishlistItems([]);
//         return response;
//       } else {
//         console.error("Failed to clear wishlist:", response.message);
//         return response;
//       }
//     } catch (error) {
//       console.error("An unexpected error occurred:", error);
//       alert("An error occurred while clearing the wishlist.");
//     }
//   };
  

    return (
        <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist,fetchWishlistItems }}>
            {children}
        </WishlistContext.Provider>
    );
};

// Hook for consuming the WishlistContext
export const useWishlist = () => useContext(WishlistContext);
