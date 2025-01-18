package com.example.backend.Auth.Controller;

import com.example.backend.Auth.model.User;
import com.example.backend.Auth.model.UserDetail;
import com.example.backend.Auth.service.UserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users/details")
public class UserDetailController {

    private final UserDetailService userDetailService;

    @Autowired
    public UserDetailController(UserDetailService userDetailService) {
        this.userDetailService = userDetailService;
    }

    // Endpoint to retrieve user details by ID
    @GetMapping("/{id}")
    public UserDetail getUserDetails(@PathVariable String id) {
        return userDetailService.getUserDetailsById(id);
    }

    // Endpoint to update user details
    @PutMapping("/{id}")
    public UserDetail updateUserDetails(@PathVariable String id, @RequestBody UserDetail partialUserDetail) {
        return userDetailService.updateUserDetails(id, partialUserDetail);
    }
    
}
