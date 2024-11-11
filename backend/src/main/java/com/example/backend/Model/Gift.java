package com.example.backend.Model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "gifts") // MongoDB collection name
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Gift {

    private String id;
    private String name;
    private String description;
    private double price;
    private String imageUrl; // Optional, for an image link
}
