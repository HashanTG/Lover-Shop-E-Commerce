package com.example.backend.Auth.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String SECRET_KEY;

    private static final long EXPIRATION_TIME = 3600000; // 1 hour in milliseconds

    // Generate a JWT token for a User (with email and role)
    @SuppressWarnings("deprecation")
    public String generateToken(String email, String role) {
        return Jwts.builder()
                   .setSubject(email) // Set the subject (email)
                   .setIssuedAt(new Date()) // Set issued date
                   .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME)) // Set expiration date
                   .claim("role", role) // Custom claim for role
                   .signWith(SignatureAlgorithm.HS256, SECRET_KEY) // Sign with the secret key
                   .compact(); // Build the JWT token
    }

    // Extract the username (subject) from the token (i.e., the email)
    public String extractUsername(String token) {
        return extractClaims(token).getSubject();
    }

    // Extract the role from the token
    public String extractRole(String token) {
        return (String) extractClaims(token).get("role");
    }

    // Extract claims (payload) from the token
    @SuppressWarnings("deprecation")
    private Claims extractClaims(String token) {
        return Jwts.parser()
                   .setSigningKey(SECRET_KEY) // Set the signing key
                   .build() // Build the JwtParser
                   .parseClaimsJws(token) // Parse the token
                   .getBody(); // Extract the claims
    }

    // Check if the token has expired
    public boolean isTokenExpired(String token) {
        return extractClaims(token).getExpiration().before(new Date());
    }

    // Validate the token for a given username (email) and check if it's not expired
    public boolean validateToken(String token, String email) {
        return (email.equals(extractUsername(token)) && !isTokenExpired(token));
    }
}
