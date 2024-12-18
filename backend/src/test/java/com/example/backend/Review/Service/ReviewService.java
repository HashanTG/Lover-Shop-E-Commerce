package com.example.backend.Review.Service;

import com.example.backend.Review.Model.Review;

import java.util.List;

public interface ReviewService {

    List<Review> getAllReviews();

    List<Review> getReviewsByProductId(String productId);

    Review addReview(Review review);

    Review updateReview(String id, Review review);

    void deleteReview(String id);
}
