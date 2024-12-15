package com.example.backend.Product.Controller;

import com.example.backend.Product.Model.ProductModel;
import com.example.backend.Product.Service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    // Get products by a list of product IDs
    @GetMapping("/batch")
    public ResponseEntity<List<ProductModel>> getProductsByIds(@RequestParam List<String> productIds) {
        List<ProductModel> products = productService.getProductsByIds(productIds);
        return ResponseEntity.ok(products);
    }
}
