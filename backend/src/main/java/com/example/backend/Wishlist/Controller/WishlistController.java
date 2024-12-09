package com.example.backend.Wishlist.Controller;

import com.example.backend.Wishlist.Service.WishlistService;
import com.example.backend.Wishlist.Model.WishlistItem;

import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {

    private final WishlistService wishlistService;

    public WishlistController(WishlistService wishlistService) {
        this.wishlistService = wishlistService;
    }

    @GetMapping("/{userId}")
    public List<WishlistItem> getWishlist(@PathVariable String userId) {
        return wishlistService.getWishlistByUser(userId);
    }

    @PostMapping
    public WishlistItem addToWishlist(@RequestBody WishlistItem item) {
        return wishlistService.addWishlistItem(item);
    }

    @DeleteMapping("/{id}")
    public void removeFromWishlist(@PathVariable String id) {
        wishlistService.deleteWishlistItem(id);
    }
}
