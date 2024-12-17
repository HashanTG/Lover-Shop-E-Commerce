package com.example.backend.Cart.Service;

import com.example.backend.Cart.Model.CartModel;
import com.example.backend.Cart.Repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    // Get cart by userId
    public CartModel getCartByUserId(String userId) {
        return cartRepository.findByUserId(userId)
                .orElseGet(() -> createEmptyCart(userId));
    }

    // Add or update an item in the cart
    public CartModel addItemToCart(String userId, String productId, int quantity) {
        CartModel cart = getCartByUserId(userId);
        
        // Check if the item already exists in the cart
        Optional<CartModel.Item> existingItem = cart.getItems().stream()
                .filter(item -> item.getProductId().equals(productId))
                .findFirst();
        
        if (existingItem.isPresent()) {
            // Update quantity if item exists
            existingItem.get().setQuantity(existingItem.get().getQuantity() + quantity);
        } else {
            // Add new item
            CartModel.Item newItem = new CartModel.Item();
            newItem.setProductId(productId);
            newItem.setQuantity(quantity);
            cart.getItems().add(newItem);
        }

        // Save and return the updated cart
        return cartRepository.save(cart);
    }

    // Remove an item from the cart
    public CartModel removeItemFromCart(String userId, String productId) {
        CartModel cart = getCartByUserId(userId);
        cart.getItems().removeIf(item -> item.getProductId().equals(productId));
        return cartRepository.save(cart);
    }

    // Clear the entire cart
    public void clearCart(String userId) {
        CartModel cart = getCartByUserId(userId);
        cart.getItems().clear();
        cartRepository.save(cart);
    }

    // Helper method to create a new empty cart for a user
    private CartModel createEmptyCart(String userId) {
        CartModel newCart = new CartModel();
        newCart.setUserId(userId);
        return cartRepository.save(newCart);
    }
}
