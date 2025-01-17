package com.example.backend.order.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Document(collection = "orders")
public class Order {
    @Id
    private String id;
    private String userId;
    private List<OrderItem> items;
    private double total;
    private String status; // e.g., Pending, Confirmed, Shipped, Delivered
    private String paymentStatus; // e.g., Paid, Pending
    private String createdAt;
}

@Data
class OrderItem {
    private String productId;
    private int quantity;
    private double price;
}
