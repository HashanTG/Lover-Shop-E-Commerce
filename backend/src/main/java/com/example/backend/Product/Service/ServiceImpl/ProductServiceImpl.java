package com.example.backend.Product.Service.ServiceImpl;

import java.sql.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.Product.Model.Product;
import com.example.backend.Product.Repository.ProductRepository;
import com.example.backend.Product.Service.ProductService;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    // Retrieve all products
    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // Retrieve a product by its ID
    @Override
    public Product getProductById(String id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + id));
    }

    // Add a new product
    @Override
    public Product addProduct(Product product) {
        product.setCreatedAt(new Date(System.currentTimeMillis())); // Use current date as creation timestamp
        return productRepository.save(product);
    }

    // Update an existing product
    @Override
    public Product updaProduct(String id, Product product) {
        Product existingProduct = getProductById(id); // Retrieve existing product
        existingProduct.setName(product.getName());
        existingProduct.setCategory(product.getCategory());
        existingProduct.setPrice(product.getPrice());
        existingProduct.setPreviousPrice(product.getPreviousPrice());
        existingProduct.setStock(product.getStock());
        existingProduct.setDescription(product.getDescription());
        existingProduct.setImages(product.getImages());
        existingProduct.setVariations(product.getVariations());
        return productRepository.save(existingProduct);
    }

    // Delete a product by its ID
    @Override
    public void deleteProduct(String id) {
        productRepository.deleteById(id);
    }

    // Retrieve products by category
    @Override
    public List<Product> getProductsByCategory(String category) {
        return productRepository.findAll()
                .stream()
                .filter(product -> product.getCategory().equalsIgnoreCase(category))
                .collect(Collectors.toList());
    }

    // Search for products by name (optional)
    public List<Product> searchProductsByName(String keyword) {
        return productRepository.findAll()
                .stream()
                .filter(product -> product.getName().toLowerCase().contains(keyword.toLowerCase()))
                .collect(Collectors.toList());
    }

    // Reduce stock for a product variation (optional for inventory management)
    public void reduceProductStock(String productId, String variationType, String variationValue, int quantity) {
        Product product = getProductById(productId);
        product.getVariations().forEach(variation -> {
            if (variation.getType().equalsIgnoreCase(variationType)) {
                variation.getOptions().forEach(option -> {
                    if (option.getValue().equalsIgnoreCase(variationValue)) {
                        if (option.getStock() >= quantity) {
                            option.setStock(option.getStock() - quantity);
                        } else {
                            throw new RuntimeException("Insufficient stock for variation: " + variationValue);
                        }
                    }
                });
            }
        });
        productRepository.save(product);
    }
}
