package com.example.backend.Wishlist.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.backend.Product.Model.Product;
import com.example.backend.Wishlist.Model.WishlistModel;
import com.example.backend.Wishlist.Service.WishlistService;
import com.example.backend.Wishlist.DTO.ProductRequestDTO;

import java.util.List;

@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {

    @Autowired
    private WishlistService wishlistService;

    @GetMapping("/{userId}")
    public WishlistModel getWishlist(@PathVariable String userId) {
        return wishlistService.getWishlistByUserId(userId);
    }

    // Retrieve wishlist with product details
    @GetMapping("/detail/{userId}")
    public List<Product> getWishlistWithProductDetails(@PathVariable String userId) {
        return wishlistService.getWishlistWithProductDetails(userId);
    }

    // Add product to wishlist
    @PostMapping("/{userId}/add")
    public WishlistModel addProductToWishlist(@PathVariable String userId, @RequestBody ProductRequestDTO productId) {
        return wishlistService.addItemToWishlist(userId, productId.getProductId());
    }

    // Remove product from wishlist
    @DeleteMapping("/{userId}/remove")
    public WishlistModel removeProductFromWishlist(@PathVariable String userId, @RequestParam String productId) {
        return wishlistService.removeItemFromWishlist(userId, productId);
    }

    // Clear entire wishlist
    @DeleteMapping("/{userId}/clear")
    public void clearWishlist(@PathVariable String userId) {
        wishlistService.clearWishlist(userId);
    }
}
