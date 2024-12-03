package com.example.backend.Service;

import java.util.List;

import com.example.backend.Model.WishlistItem;

public interface WishlistService {
    List<WishlistService> getWishlistBYUser(String userId);

    static WishlistItem addWishlistItem(WishlistItem item) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'addWishlistItem'");
    }

    void deleteWishlistItem(String id);

}
