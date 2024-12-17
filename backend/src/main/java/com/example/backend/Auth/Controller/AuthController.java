package com.example.backend.Auth.Controller;

import com.example.backend.Auth.model.User;
import com.example.backend.Auth.service.UserService;
import com.example.backend.Auth.security.JwtUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.Cookie;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping("/hello")
    public String hello() {
        return "Hello, world!";
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user, HttpServletResponse response) {
        String email = user.getEmail();
        String password = user.getPassword();

        if (email == null || password == null) {
            return ResponseEntity.badRequest().body("Email and password are required.");
        }

        Optional<User> authenticatedUser = userService.authenticateUser(email, password);
        if (authenticatedUser.isPresent()) {
            String userId = authenticatedUser.get().getId();
            String role = authenticatedUser.get().getRole();
            try {
                String jwtToken = jwtUtil.generateToken(userId, email, role);

                // Create and set the cookie with the JWT
                Cookie jwtCookie = new Cookie("jwt", jwtToken);
                jwtCookie.setHttpOnly(true); // Prevent JavaScript access to the cookie
                jwtCookie.setSecure(false); // Only send over HTTPS in production
                jwtCookie.setPath("/"); // Make cookie available to all endpoints
                jwtCookie.setMaxAge(3600); // Expiration time: 1 hour
                response.addCookie(jwtCookie);

                return ResponseEntity.ok("Login successful!");
            } catch (Exception e) {
                return ResponseEntity.status(500).body("Error generating JWT token.");
            }
        }

        return ResponseEntity.status(401).body("Invalid email or password.");
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        String email = user.getEmail();
        String password = user.getPassword();

        if (email == null || password == null) {
            return ResponseEntity.badRequest().body("Email and password are required.");
        }

        boolean isRegistered = userService.registerUser(user);
        if (isRegistered) {
            return ResponseEntity.ok("Registration successful!");
        }

        return ResponseEntity.status(400).body("Registration failed. Email might already be in use.");
    }

    @GetMapping("/status")
    public ResponseEntity<String> checkAuthStatus(HttpServletRequest request) {
        // Extract JWT token from the cookies
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("jwt".equals(cookie.getName())) {
                    String token = cookie.getValue();
                    try {
                        // Validate the JWT token
                        if (jwtUtil.validateToken(token)) {
                            return ResponseEntity.ok("Authenticated");
                        } else {
                            return ResponseEntity.status(401).body("Invalid token");
                        }
                    } catch (Exception e) {
                        return ResponseEntity.status(500).body("Error validating token");
                    }
                }
            }
        }

        return ResponseEntity.status(401).body("No token provided");
    }


}
