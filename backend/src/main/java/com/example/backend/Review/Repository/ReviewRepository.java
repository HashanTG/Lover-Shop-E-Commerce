package com.example.backend.Review.Repository;

import com.example.backend.Review.Model.Review;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

import java.util.List;

public interface ReviewRepository extends MongoRepository<Review, String> {

    List<Review> findByProductId(String productId);

    Optional<Review> findById(String id); // Optional, useful for findById

    boolean existsByUserIdAndProductId(String userId, String productId);


}
