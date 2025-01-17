package com.example.backend.order.Service;

import com.example.backend.order.Model.Order;
import com.example.backend.order.Repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    // Create a new order
    public Order createOrder(Order order) {
        order.setCreatedAt(System.currentTimeMillis() + ""); // You can use your preferred date format
        return orderRepository.save(order);
    }
    //Get All orders
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    // Get all orders for a user
    public List<Order> getOrdersByUserId(String userId) {
        return orderRepository.findAll(); // Customize with a query to filter by userId
    }

    // Get order details by order ID
    public Optional<Order> getOrderById(String orderId) {
        return orderRepository.findById(orderId);
    }
}
