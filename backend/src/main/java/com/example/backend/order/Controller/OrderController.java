package com.example.backend.order.Controller;

import com.example.backend.order.ENUMS.OrderStatus;
import com.example.backend.order.Model.Order;
import com.example.backend.order.Model.OrderItem;
import com.example.backend.order.Service.OrderService;
import com.example.backend.Auth.UtilSecurity.SecurityUtil;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.Product.Service.ProductService;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class OrderController {
    private final OrderService orderService;
    private final ProductService productService;

    public OrderController(OrderService orderService, ProductService productService) {
        this.productService = productService;
        this.orderService = orderService;
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Page<Order>> getAllOrders(
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String paymentStatus,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "DESC") String sortDir) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.fromString(sortDir), sortBy));

        if (startDate != null && endDate != null) {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            LocalDateTime start = LocalDate.parse(startDate, formatter).atStartOfDay();
            LocalDateTime end = LocalDate.parse(endDate, formatter).atTime(23, 59, 59);
            return ResponseEntity.ok(orderService.getOrdersByDateRange(start, end, pageable));
        } else if (status != null) {
            return ResponseEntity.ok(orderService.getOrdersByStatus(status, pageable));
        } else if (paymentStatus != null) {
            return ResponseEntity.ok(orderService.getOrdersByPaymentStatus(paymentStatus, pageable));
        }
        return ResponseEntity.ok(orderService.getAllOrders(pageable));
    }

    // Get Orders by User
    @PreAuthorize("hasRole('USER')")
    @GetMapping("/user")
    public ResponseEntity<Page<Order>> getOrdersByUser( // Fetch user ID dynamically from SecurityContext
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "50") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "DESC") String sortDir
    ) {
        String userId = SecurityUtil.getCurrentUserId();
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.fromString(sortDir), sortBy));
        return ResponseEntity.ok(orderService.getOrdersByUserId(userId, pageable));
    }

    // Create A Order
    @PreAuthorize("hasRole('USER')")
    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody Order order) {
        String userId = SecurityUtil.getCurrentUserId(); // Fetch user ID dynamically
        order.setUserId(userId);
    
        // Iterate through each product in the order
        for (OrderItem item : order.getItems()) {
            String productId = item.getProductId();
            String variationType = item.getVariationType();
            String variationValue = item.getVariationValue();
            int quantity = item.getQuantity();
            System.out.println("Product ID: " + productId);
            System.out.println("Variation Type: " + variationType);
            System.out.println("Variation Value: " + variationValue);
            System.out.println("Quantity: " + quantity);
    
            try {
                productService.reduceProductStock(productId, variationType, variationValue, quantity);
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to reduce stock: " + e.getMessage());
            }
        }
    
        // Save the order after stock reduction
        Order createdOrder = orderService.createOrder(order);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdOrder);
    }
    
    

    // Get order by Id
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable String id) {
        Optional<Order> order = orderService.getOrderById(id);
        return order.map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // Update Status
    @PutMapping("/{id}/status")
    public ResponseEntity<Order> updateOrderStatus(
            @PathVariable String id,
            @RequestParam OrderStatus status) {
        String adminId = SecurityUtil.getCurrentUserId(); 
        Order updatedOrder = orderService.updateOrderStatus(id, status, adminId);
        return ResponseEntity.ok(updatedOrder);
    }

    //Confirm Delivery
    @PreAuthorize("hasRole('USER')")
    @PutMapping("/{id}/confirm")
    public ResponseEntity<Order> confirmDelivery(@PathVariable String id) {
        Order updatedOrder = orderService.confirmDelivery(id);
        return ResponseEntity.ok(updatedOrder);
    }

    
}
