package com.example.backend.Wishlist.Service.ServiceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.Wishlist.Model.WishlistItem;
import com.example.backend.Wishlist.Repository.WishlistRepository;
import com.example.backend.Wishlist.Service.WishlistService;

@Service
public class WishlistServiceImpl implements WishlistService {

    @Autowired
    private WishlistRepository wishlistRepository;

    @Override
    public List<WishlistItem> getWishlistByUser(String userId) {
        return wishlistRepository.findByUserId(userId);
    }

    @Override
    public WishlistItem addWishlistItem(WishlistItem item) {
        return wishlistRepository.save(item);
    }

    @Override
    public void deleteWishlistItem(String id) {
        wishlistRepository.deleteById(id);
    }
}
