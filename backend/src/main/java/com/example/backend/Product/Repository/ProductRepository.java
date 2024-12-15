package com.example.backend.Product.Repository;

import com.example.backend.Product.Model.ProductModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

// MongoRepository automatically provides methods like findById and findAll
@Repository
public interface ProductRepository extends MongoRepository<ProductModel, String> {

    // Custom query to find products by a list of product IDs
    List<ProductModel> findByProductIdIn(List<String> productIds);
}
