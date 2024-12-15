package com.example.backend.Cart.Model;

import com.example.backend.Product.Model.ProductModel;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@Document(collection = "carts") // MongoDB collection name
public class CartModel {

    @Id
    private String id; // Unique cart ID, auto-generated by MongoDB
    private String userId; // Unique user ID associated with the cart
    private List<Item> items = new ArrayList<>();

    @Data
    public static class Item {
        private String productId; // Product ID for the item
        private int quantity; // Quantity of the product
        private ProductModel productDetails; // Added field to store product details
    }
}

