package com.example.backend.order.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

import com.example.backend.order.ENUMS.OrderStatus;
import com.example.backend.order.ENUMS.PaymentStatus;
import java.time.LocalDateTime;

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
    private OrderStatus status; // Enum
    private PaymentStatus paymentStatus; // Enum
    private LocalDateTime createdAt;
    private LocalDateTime lastUpdatedAt;
    private boolean confirmedByUser; // User confirms delivery
    private String updatedBy; // Admin who made the last status change
}

@Data
class OrderItem {
    private String productId;
    private int quantity;
    private double price;
}

