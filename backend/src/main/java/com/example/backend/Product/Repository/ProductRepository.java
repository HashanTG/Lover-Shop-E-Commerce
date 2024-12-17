package com.example.backend.Product.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.backend.Product.Model.Product;

public interface ProductRepository extends MongoRepository<Product, String> {

}
