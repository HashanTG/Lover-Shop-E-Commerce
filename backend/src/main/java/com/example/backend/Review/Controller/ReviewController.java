package com.example.backend.Review.Controller;

import com.example.backend.Review.Model.Review;
import com.example.backend.Review.Service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    // Get all reviews
    @GetMapping
    public List<Review> getAllReviews() {
        return reviewService.getAllReviews();
    }

    // Get reviews for a specific product
    @GetMapping("/product/{productId}")
    public List<Review> getReviewsByProductId(@PathVariable String productId) {
        return reviewService.getReviewsByProductId(productId);
    }

    // Add a new review
    @PostMapping
    public ResponseEntity<Review> addReview(@RequestBody Review review) {
        Review savedReview = reviewService.addReview(review);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedReview);
    }

    // Update an existing review
    @PutMapping("/{id}")
    public ResponseEntity<Review> updateReview(@PathVariable String id, @RequestBody Review review) {
        Review updatedReview = reviewService.updateReview(id, review);
        return ResponseEntity.ok(updatedReview);
    }

    // Delete a review by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable String id) {
        reviewService.deleteReview(id);
        return ResponseEntity.noContent().build();
    }

    // Calculate the overall rating for a product
    @GetMapping("/product/{productId}/rating")
    public ResponseEntity<Double> getOverallRating(@PathVariable String productId) {
        Double averageRating = reviewService.getOverallRating(productId);
        return ResponseEntity.ok(averageRating);
    }

    // Admin reply to a review
    @PutMapping("/{id}/reply")
    public ResponseEntity<Review> replyToReview(
            @PathVariable String id,
            @RequestBody String reply) {
        Review updatedReview = reviewService.replyToReview(id, reply);
        return ResponseEntity.ok(updatedReview);
    }
}

