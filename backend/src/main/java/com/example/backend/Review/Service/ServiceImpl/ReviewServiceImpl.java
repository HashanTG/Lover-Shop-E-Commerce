package com.example.backend.Review.Service.ServiceImpl;

import com.example.backend.Review.Model.Review;
import com.example.backend.Review.Repository.ReviewRepository;
import com.example.backend.Review.Service.ReviewService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Override
    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    @Override
    public List<Review> getReviewsByProductId(String productId) {
        return reviewRepository.findByProductId(productId);
    }

    @Override
    public Review addReview(Review review) {
        return reviewRepository.save(review);
    }

    @Override
    public Review updateReview(String id, Review review) {
        Review existingReview = reviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Review not found"));
        existingReview.setRating(review.getRating());
        existingReview.setComment(review.getComment());
        return reviewRepository.save(existingReview);
    }

    @Override
    public void deleteReview(String id) {
        reviewRepository.deleteById(id);
    }

    @Override
    public Double getOverallRating(String productId) {
        List<Review> reviews = reviewRepository.findByProductId(productId);
        return reviews.stream()
                .mapToInt(Review::getRating)
                .average()
                .orElse(0.0);
    }

    @Override
    public Review replyToReview(String reviewId, String reply) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new RuntimeException("Review not found"));
        review.setAdminReply(reply);
        return reviewRepository.save(review);
    }

    public boolean existsByUserIdAndProductId(String userId, String productId) {
        return reviewRepository.existsByUserIdAndProductId(userId, productId);
    }
    
}

