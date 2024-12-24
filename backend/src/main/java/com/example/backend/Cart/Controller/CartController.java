package com.example.backend.Cart.Controller;

import com.example.backend.Auth.UtilSecurity.SecurityUtil;
import com.example.backend.Cart.Model.CartModel;
import com.example.backend.Cart.Service.CartService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    // Get cart details for the authenticated user
    @GetMapping
    public ResponseEntity<CartModel> getCart() {
        String userId = SecurityUtil.getCurrentUserId(); // Fetch user ID dynamically from SecurityContext
        CartModel cart = cartService.getCartByUserId(userId);
        return ResponseEntity.ok(cart);
    }
    

    @GetMapping("/details")
    public ResponseEntity<CartModel> getCartWithDetails() {
        String userId = SecurityUtil.getCurrentUserId(); // Fetch user ID dynamically from SecurityContext
        CartModel cart = cartService.getCartWithProductDetails(userId); // Fetch cart with product details
        return ResponseEntity.ok(cart);
    }

    // Add item to cart for the authenticated user
    @PostMapping("/add")
    public ResponseEntity<CartModel> addItemToCart(@RequestBody AddItemRequest addItemRequest) {
        String userId = SecurityUtil.getCurrentUserId(); // Fetch user ID dynamically
        CartModel updatedCart = cartService.addItemToCart(
                userId,
                addItemRequest.getProductId(),
                addItemRequest.getQuantity()
        );
        return ResponseEntity.ok(updatedCart);
    }

    // Remove item from cart for the authenticated user
    @DeleteMapping("/item/remove")
    public ResponseEntity<CartModel> removeItemFromCart(@RequestBody RemoveItemRequest removeItemRequest) {
        String userId = SecurityUtil.getCurrentUserId(); // Fetch user ID dynamically
        CartModel updatedCart = cartService.removeItemFromCart(
                userId,
                removeItemRequest.getProductId()
        );
        return ResponseEntity.ok(updatedCart);
    }

    // Clear entire cart for the authenticated user
    @DeleteMapping("/clear")
    public ResponseEntity<Void> clearCart() {
        String userId = SecurityUtil.getCurrentUserId(); // Fetch user ID dynamically
        cartService.clearCart(userId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    // DTOs with Lombok annotations
    @Data
    public static class AddItemRequest {
        private String productId;
        private int quantity;
    }

    @Data
    public static class RemoveItemRequest {
        private String productId;
    }
}
