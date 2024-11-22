package com.example.backend.Auth.Controller;

import com.example.backend.Auth.model.User;
import com.example.backend.Auth.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @GetMapping("/hello")
    public String hello() {
        return "Hello, world!";
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {
        String email = user.getEmail();
        String password = user.getPassword();

        System.out.println("Login request received for email: " + email);

        if (email == null || password == null) {
            System.out.println("Email or password is missing");
            return ResponseEntity.badRequest().body("Email and password are required.");
        }

        Optional<User> authenticatedUser = userService.authenticateUser(email, password);
        if (authenticatedUser.isPresent()) {
            System.out.println("User authenticated successfully");
            return ResponseEntity.ok("Login successful!");
        }

        System.out.println("Authentication failed");
        return ResponseEntity.status(401).body("Invalid email or password.");
    }
}
