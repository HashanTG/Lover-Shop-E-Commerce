package com.example.backend.Product.Model;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection = "products")  // MongoDB collection name
public class ProductModel {

    @org.springframework.data.annotation.Id
    private String productId;  // MongoDB ID
    private String name;
    private double price;
    private List<Review> reviews;
    private List<Payment> payments;

    @Data
    public static class Review {
        private String reviewId;
        private String productId;
        private String userId;
        private int rating;
        private String comment;
        private String createdAt;
    }

    @Data
    public static class Payment {
        private String paymentId;
        private String orderId;
        private double amount;
        private String paymentMethod;
        private String status;
        private String createdAt;
    }
}
