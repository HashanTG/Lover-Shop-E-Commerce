package com.example.backend.Service;

import com.example.backend.Model.Gift;
import com.example.backend.Repository.GiftRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GiftService {

    private final GiftRepository giftRepository;

    @Autowired
    public GiftService(GiftRepository giftRepository) {
        this.giftRepository = giftRepository;
    }

    // Get all gifts
    public List<Gift> getAllGifts() {
        return giftRepository.findAll();
    }

    // Get a gift by ID
    public Optional<Gift> getGiftById(String id) {
        return giftRepository.findById(id);
    }

    // Create a new gift
    public Gift createGift(Gift gift) {
        return giftRepository.save(gift);
    }

    // Update an existing gift
    public Gift updateGift(String id, Gift gift) {
        if (giftRepository.existsById(id)) {
            gift.setId(id); // Set the existing ID
            return giftRepository.save(gift);
        }
        return null; // Return null if the gift does not exist
    }

    // Delete a gift by ID
    public void deleteGift(String id) {
        giftRepository.deleteById(id);
    }
}

