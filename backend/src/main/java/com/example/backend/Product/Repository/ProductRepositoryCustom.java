package com.example.backend.Product.Repository;

import com.example.backend.Product.Model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


public interface ProductRepositoryCustom {
    Page<Product> filterProducts(String name, String category, Double minPrice, Double maxPrice, Pageable pageable);
}
