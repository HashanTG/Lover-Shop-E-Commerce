package com.example.backend.Repository;

import com.example.backend.Model.Gift;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GiftRepository extends MongoRepository<Gift, String> {
    // You can define custom queries if needed, for example:
    // List<Gift> findByPriceLessThan(double price);
}
