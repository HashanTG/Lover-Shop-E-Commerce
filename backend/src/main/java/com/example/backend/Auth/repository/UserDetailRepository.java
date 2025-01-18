package com.example.backend.Auth.repository;


import com.example.backend.Auth.model.UserDetail;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDetailRepository extends MongoRepository<UserDetail, String> {
    // No additional custom methods needed for basic CRUD operations
}
