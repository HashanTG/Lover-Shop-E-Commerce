package com.example.backend.Review.Service;

import com.example.backend.Review.Model.Review;

import java.util.List;

public interface ReviewService {

    // Retrieve all reviews
    List<Review> getAllReviews();

    // Retrieve reviews by product ID
    List<Review> getReviewsByProductId(String productId);

    // Add a new review
    Review addReview(Review review);

    // Update an existing review
    Review updateReview(String id, Review review);

    // Delete a review by ID
    void deleteReview(String id);

    // Calculate the overall rating for a product
    Double getOverallRating(String productId);

    // Admin reply to a review
    Review replyToReview(String reviewId, String reply);

    // Check if a review exists for a specific user and product
    boolean existsByUserIdAndProductId(String userId, String productId);
}

