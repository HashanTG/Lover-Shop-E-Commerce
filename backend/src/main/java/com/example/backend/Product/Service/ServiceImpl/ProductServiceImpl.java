package com.example.backend.Product.Service.ServiceImpl;

import java.sql.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.Product.Model.Product;
import com.example.backend.Product.Repository.ProductRepository;
import com.example.backend.Product.Service.ProductService;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;



@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    // Retrieve all products by Page by Page
    @Override
    public Page<Product> getProductsPage(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productRepository.findAll(pageable);
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

    // Retrieve products by Filter
    @Override
    public Page<Product> filterProducts(String name, String category, Double minPrice, Double maxPrice, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productRepository.filterProducts(name, category, minPrice, maxPrice, pageable);
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
    //Get prodcts by a Id List
    @Override
    public List<Product> getProductsByIds(List<String> productIds) {
        return productRepository.findByIdIn(productIds);
    }
}
