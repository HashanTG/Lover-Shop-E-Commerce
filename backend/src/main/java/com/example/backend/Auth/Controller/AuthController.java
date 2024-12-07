package com.example.backend.Auth.Controller;

import com.example.backend.Auth.model.User;
import com.example.backend.Auth.service.UserService;
import com.example.backend.Auth.security.JwtUtil; // Add this import
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil; // Inject JwtUtil for token generation

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
            
            String role = authenticatedUser.get().getRole();
            // Generate a JWT token after successful authentication
            String jwtToken = jwtUtil.generateToken(email, role);

            return ResponseEntity.ok(jwtToken); // Return the token as the response
        }

        System.out.println("Authentication failed");
        return ResponseEntity.status(401).body("Invalid email or password.");
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        String email = user.getEmail();
        String password = user.getPassword();


        if (email == null || password == null) {
            System.out.println("Email or password is missing");
            return ResponseEntity.badRequest().body("Email and password are required.");
        }

        boolean isRegistered = userService.registerUser(user);
        if (isRegistered) {
            System.out.println("User registered successfully");
            return ResponseEntity.ok("Registration successful!");
        }

        System.out.println("Registration failed");
        return ResponseEntity.status(400).body("Registration failed. Email might already be in use.");
    }
}
