package com.example.backend.Wishlist.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.backend.Auth.UtilSecurity.SecurityUtil;
import com.example.backend.Product.Model.Product;
import com.example.backend.Wishlist.Model.WishlistModel;
import com.example.backend.Wishlist.Service.WishlistService;
import com.example.backend.Wishlist.DTO.ProductRequestDTO;


import java.util.List;

@RestController
@RequestMapping("/api/wishlist")
@CrossOrigin(origins = "http://localhost:5173")
public class WishlistController {

    @Autowired
    private WishlistService wishlistService;

    @GetMapping
    public WishlistModel getWishlist() {
        String userId = SecurityUtil.getCurrentUserId(); // Fetch user ID dynamically from SecurityContext
        return wishlistService.getWishlistByUserId(userId);
    }

    // Retrieve wishlist with product details
    @GetMapping("/detail")
    public List<Product> getWishlistWithProductDetails() {
        String userId = SecurityUtil.getCurrentUserId(); // Fetch user ID dynamically from SecurityContext
        return wishlistService.getWishlistWithProductDetails(userId);
    }

    // Add product to wishlist
    @PostMapping("/add")
    public WishlistModel addProductToWishlist(@RequestBody ProductRequestDTO productId) {
        String userId = SecurityUtil.getCurrentUserId(); // Fetch user ID dynamically from SecurityContext
        return wishlistService.addItemToWishlist(userId, productId.getProductId());
    }

    // Remove product from wishlist
    @DeleteMapping("/remove")
    public WishlistModel removeProductFromWishlist( @RequestParam String productId) {
        String userId = SecurityUtil.getCurrentUserId(); // Fetch user ID dynamically from SecurityContext
        return wishlistService.removeItemFromWishlist(userId, productId);
    }

    // Clear entire wishlist
    @DeleteMapping("/clear")
    public void clearWishlist() {
        String userId = SecurityUtil.getCurrentUserId(); // Fetch user ID dynamically from SecurityContext
        wishlistService.clearWishlist(userId);
    }
}
