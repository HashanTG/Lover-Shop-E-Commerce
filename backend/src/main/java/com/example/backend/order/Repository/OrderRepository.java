package com.example.backend.order.Repository;

import com.example.backend.order.Model.Order;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends MongoRepository<Order, String> {
    // Add custom query methods here if needed, for example:
    // List<Order> findByUserId(String userId);
}

