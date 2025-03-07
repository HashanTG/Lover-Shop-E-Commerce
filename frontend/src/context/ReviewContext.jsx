import React, { createContext, useState, useContext } from "react";

// Create the ReviewContext
const ReviewContext = createContext();

// ReviewProvider component to wrap your app
export const ReviewProvider = ({ children }) => {
    const [reviews, setReviews] = useState([]);

    // Add a review
    const addReview = (review) => {
        setReviews((prevReviews) => [...prevReviews, review]);
    };

    // Get reviews for a product
    const getReviews = (productId) => {
        return reviews.filter(review => review.productId === productId);
    };

    return (
        <ReviewContext.Provider value={{ reviews, addReview, getReviews }}>
            {children}
        </ReviewContext.Provider>
    );
};

// Hook for consuming the ReviewContext
export const useReview = () => useContext(ReviewContext);
