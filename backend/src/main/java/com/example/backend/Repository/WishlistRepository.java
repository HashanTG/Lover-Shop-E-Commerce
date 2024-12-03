package com.example.backend.Repository;

import com.example.backend.Model.WishlistItem;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WishlistRepository extends MongoRepository<WishlistItem, String> {
    List<WishlistItem> finfindByUserId(String userId);
}
