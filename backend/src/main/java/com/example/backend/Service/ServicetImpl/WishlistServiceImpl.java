package com.example.backend.Service.ServicetImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.Model.WishlistItem;
import com.example.backend.Repository.WishlistRepository;
import com.example.backend.Service.WishlistService;

@Service
public class WishlistServiceImpl implements WishlistService {

    @Autowired
    private WishlistRepository wishlistRepository;

    @Override
    public List<WishlistItem> getWishlistByUser(String userId) {
        return wishlistRepository.finfindByUserId(userId);
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
