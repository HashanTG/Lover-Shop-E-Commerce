
package com.example.backend.Review.Model;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.Date;

@Document(collection = "reviews")
@Data // Generates Getters, Setters, toString, equals, and hashCode
@NoArgsConstructor // Generates a no-argument constructor
@AllArgsConstructor // Generates a constructor with all fields
public class Review {

    @Id
    private String id;
    private String productId; // Links the review to a specific product
    private String userId; // Links the review to a specific user
    private Integer rating; // Rating out of 5
    private String comment; // User's review
    private Date createdAt; // Timestamp of the review
    private String adminReply; // Admin's reply to the review
    private Date replyCreatedAt; // Timestamp of the admin's reply

}

