package com.example.backend.Product.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.backend.Product.Model.Product;
import com.example.backend.Product.Service.ProductService;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    // Get all products by Page by Page
    @GetMapping
    public Page<Product> getAllProducts(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "20") int size) {
    return productService.getProductsPage(page, size);
    }

    // Get product by ID
    @GetMapping("/{id}")
    public Product getProductById(@PathVariable String id) {
        return productService.getProductById(id);
    }

    // Add a new product
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public Product addProduct(@RequestBody Product product) {
        return productService.addProduct(product);
    }

    // Update an existing product
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public Product updaProduct(@PathVariable String id, @RequestBody Product product) {
        return productService.updaProduct(id, product);
    }

    // Delete a product by ID
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable String id) {
        productService.deleteProduct(id);
    }

    //Filter of recieving Products
    @GetMapping("/filter")
    public Page<Product> filterProducts(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return productService.filterProducts(name, category, minPrice, maxPrice, page, size);
    }
    

    // Reduce stock for a specific variation (optional feature)
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}/reduce-stock")
    public void reduceProductStock(
            @PathVariable String id,
            @RequestParam String variationType,
            @RequestParam String variationValue,
            @RequestParam int quantity) {
        productService.reduceProductStock(id, variationType, variationValue, quantity);
    }
}
