package com.example.backend.Controller;

import com.example.backend.Model.Gift;
import com.example.backend.Service.GiftService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/gifts")
public class GiftController {

    private final GiftService giftService;

    @Autowired
    public GiftController(GiftService giftService) {
        this.giftService = giftService;
    }

    // Get all gifts
    @GetMapping
    public List<Gift> getAllGifts() {
        return giftService.getAllGifts();
    }

    // Get gift by ID
    @GetMapping("/{id}")
    public ResponseEntity<Gift> getGiftById(@PathVariable String id) {
        Optional<Gift> gift = giftService.getGiftById(id);
        return gift.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // Create a new gift
    @PostMapping
    public ResponseEntity<Gift> createGift(@RequestBody Gift gift) {
        Gift createdGift = giftService.createGift(gift);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdGift);
    }

    // Update an existing gift
    @PutMapping("/{id}")
    public ResponseEntity<Gift> updateGift(@PathVariable String id, @RequestBody Gift gift) {
        Gift updatedGift = giftService.updateGift(id, gift);
        return updatedGift != null ? ResponseEntity.ok(updatedGift)
                : ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    // Delete a gift by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGift(@PathVariable String id) {
        giftService.deleteGift(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
