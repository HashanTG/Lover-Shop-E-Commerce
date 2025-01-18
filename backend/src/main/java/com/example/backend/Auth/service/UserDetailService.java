package com.example.backend.Auth.service;

import com.example.backend.Auth.model.UserDetail;
import com.example.backend.Auth.repository.UserDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserDetailService {

    private final UserDetailRepository userDetailRepository;

    @Autowired
    public UserDetailService(UserDetailRepository userDetailRepository) {
        this.userDetailRepository = userDetailRepository;
    }

    // Retrieve user details by ID
    public UserDetail getUserDetailsById(String id) {
        Optional<UserDetail> userDetail = userDetailRepository.findById(id);
        return userDetail.orElse(null);
    }

    // Update user details
    public UserDetail updateUserDetails(String id, UserDetail updatedUserDetail) {
        Optional<UserDetail> existingUserDetailOpt = userDetailRepository.findById(id);
        if (existingUserDetailOpt.isPresent()) {
            UserDetail existingUserDetail = existingUserDetailOpt.get();
            
            // Update only the fields that are provided
            if (updatedUserDetail.getFirstName() != null) {
                existingUserDetail.setFirstName(updatedUserDetail.getFirstName());
            }
            if (updatedUserDetail.getLastName() != null) {
                existingUserDetail.setLastName(updatedUserDetail.getLastName());
            }
            if (updatedUserDetail.getAddresses() != null) {
                existingUserDetail.setAddresses(updatedUserDetail.getAddresses());
            }
            if (updatedUserDetail.getCardDetails() != null) {
                existingUserDetail.setCardDetails(updatedUserDetail.getCardDetails());
            }
    
            return userDetailRepository.save(existingUserDetail);
        }
        return null;  // Return null if user is not found
    }
    
}
