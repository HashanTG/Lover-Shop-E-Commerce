package com.example.backend.Product.Service;

import com.example.backend.Product.Model.ProductModel;
import com.example.backend.Product.Repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    // Fetch product details by product IDs
    public List<ProductModel> getProductsByIds(List<String> productIds) {
        return productRepository.findByProductIdIn(productIds);  // MongoDB query method
    }
}
