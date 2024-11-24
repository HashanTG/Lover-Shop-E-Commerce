package com.example.backend.Cart.Controller;

import com.example.backend.Cart.Model.CartModel;
import com.example.backend.Cart.Service.CartService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    // Get cart by userId (unchanged)
    @GetMapping("/{userId}")
    public ResponseEntity<CartModel> getCart(@PathVariable String userId) {
        CartModel cart = cartService.getCartByUserId(userId);
        return ResponseEntity.ok(cart);
    }

    // Add item to cart
    @PostMapping("/add")
    public ResponseEntity<CartModel> addItemToCart(@RequestBody AddItemRequest addItemRequest) {
        CartModel updatedCart = cartService.addItemToCart(
                addItemRequest.getUserId(),
                addItemRequest.getProductId(),
                addItemRequest.getQuantity()
        );
        return ResponseEntity.ok(updatedCart);
    }

    // Remove item from cart
    @DeleteMapping("/item/remove")
    public ResponseEntity<CartModel> removeItemFromCart(@RequestBody RemoveItemRequest removeItemRequest) {
        CartModel updatedCart = cartService.removeItemFromCart(
                removeItemRequest.getUserId(),
                removeItemRequest.getProductId()
        );
        return ResponseEntity.ok(updatedCart);
    }

    // Clear entire cart
    @DeleteMapping("/clear")
    public ResponseEntity<Void> clearCart(@RequestBody ClearCartRequest clearCartRequest) {
        cartService.clearCart(clearCartRequest.getUserId());
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    // DTOs with Lombok annotations
    @Data
    public static class AddItemRequest {
        private String userId;
        private String productId;
        private int quantity;
    }

    @Data
    public static class RemoveItemRequest {
        private String userId;
        private String productId;
    }

    @Data
    public static class ClearCartRequest {
        private String userId;
    }
}
