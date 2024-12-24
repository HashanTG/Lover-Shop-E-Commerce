package com.example.backend.Product.Service;

import java.util.List;

import com.example.backend.Product.Model.Product;

public interface ProductService {

    List<Product> getAllProducts();

    Product getProductById(String id);

    Product addProduct(Product product);

    Product updaProduct(String id, Product product);

    void deleteProduct(String id);

    void reduceProductStock(String productId, String variationType, String variationValue, int quantity);

    List<Product> searchProductsByName(String keyword);

    List<Product> getProductsByCategory(String category);

}
