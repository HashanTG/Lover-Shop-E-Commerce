package com.example.backend.Controller;

import com.example.backend.Service.WishlistService;
import com.example.backend.Model.WishlistItem;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
    @Autowired
    private WishlistService wishlistService;

    @GetMapping("/{userId}")
    public List<WishlistService> getWishlist(@PathVariable String userId) {
        return wishlistService.getWishlistBYUser(userId);

    }

    @PostMapping
    public WishlistItem addToWishlist(@RequestBody WishlistItem item) {
        return WishlistService.addWishlistItem(item);
    }

    @DeleteMapping("/{id}")
    public void removeFromWishlist(@PathVariable String id) {
        wishlistService.deleteWishlistItem(id);
    }

}
