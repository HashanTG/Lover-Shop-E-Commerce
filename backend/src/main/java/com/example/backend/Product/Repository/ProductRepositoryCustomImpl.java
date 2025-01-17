package com.example.backend.Product.Repository;

import com.example.backend.Product.Model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;
import java.util.List;


@Repository
public class ProductRepositoryCustomImpl implements ProductRepositoryCustom {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public Page<Product> filterProducts(String name, String category, Double minPrice, Double maxPrice, Pageable pageable) {
        Query query = new Query();

        // Add dynamic filters
        if (name != null && !name.isEmpty()) {
            query.addCriteria(Criteria.where("name").regex(name, "i")); // Case-insensitive search
        }
        if (category != null && !category.isEmpty()) {
            query.addCriteria(Criteria.where("category").regex(category,"i")); // Case-insensitive search
        }
        if (minPrice != null) {
            query.addCriteria(Criteria.where("price").gte(minPrice));
        }
        if (maxPrice != null) {
            query.addCriteria(Criteria.where("price").lte(maxPrice));
        }

        query.with(pageable); // Apply pagination first

        long total = mongoTemplate.count(query, Product.class); // Get total count based on the query criteria

        List<Product> products = mongoTemplate.find(query, Product.class); // Execute the query with pagination applied
        return new PageImpl<>(products, pageable, total); // Create and return the Page object

    }
}
