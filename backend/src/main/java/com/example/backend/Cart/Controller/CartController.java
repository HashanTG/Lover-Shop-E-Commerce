package com.example.backend.Cart.Controller;

import com.example.backend.Cart.Model.CartModel;
import com.example.backend.Cart.Service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    // Get cart by userId
    @GetMapping("/{userId}")
    public ResponseEntity<CartModel> getCart(@PathVariable String userId) {
        CartModel cart = cartService.getCartByUserId(userId);
        return ResponseEntity.ok(cart);
    }

    // Add item to cart
    @PostMapping("/{userId}/add")
    public ResponseEntity<CartModel> addItemToCart(@PathVariable String userId, 
                                                   @RequestParam String productId, 
                                                   @RequestParam int quantity) {
        CartModel updatedCart = cartService.addItemToCart(userId, productId, quantity);
        return ResponseEntity.ok(updatedCart);
    }

    // Remove item from cart
    @DeleteMapping("/{userId}/item/{productId}")
    public ResponseEntity<CartModel> removeItemFromCart(@PathVariable String userId, 
                                                        @PathVariable String productId) {
        CartModel updatedCart = cartService.removeItemFromCart(userId, productId);
        return ResponseEntity.ok(updatedCart);
    }

    // Clear entire cart
    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> clearCart(@PathVariable String userId) {
        cartService.clearCart(userId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
