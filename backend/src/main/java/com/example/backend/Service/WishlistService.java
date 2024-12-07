package com.example.backend.Service;

import java.util.List;
import com.example.backend.Model.WishlistItem;

public interface WishlistService {

    public List<WishlistItem> getWishlistByUser(String userId);

    public WishlistItem addWishlistItem(WishlistItem item);

    public void deleteWishlistItem(String id);
}
