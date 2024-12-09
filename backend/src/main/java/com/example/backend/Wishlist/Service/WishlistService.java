package com.example.backend.Wishlist.Service;

import com.example.backend.Wishlist.Service.WishlistService;
import java.util.List;

import com.example.backend.Wishlist.Model.WishlistItem;

public interface WishlistService {

    public List<WishlistItem> getWishlistByUser(String userId);

    public WishlistItem addWishlistItem(WishlistItem item);

    public void deleteWishlistItem(String id);
}
