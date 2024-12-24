package com.example.backend.Product.Model;

import java.sql.Date;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "products")
public class Product {
    @Id
    private String id;
    private String name;
    private String category;
    private double price;
    private double previousPrice;
    private int stock;
    private String description;
    private List<String> images;
    private Date createdAt;
    private List<Variation> variations;

    @Data
    public static class Variation {
        private String type;
        private List<Option> options;

        @Data
        public static class Option {
            private String value;
            private int stock;
        }
    }
}
