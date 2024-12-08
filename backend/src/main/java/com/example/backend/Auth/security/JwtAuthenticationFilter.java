package com.example.backend.Auth.security;

import com.nimbusds.jose.JWSVerifier;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.SignedJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.backend.Auth.service.UserService;
import com.example.backend.Auth.model.User;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        final String authorizationHeader = request.getHeader("Authorization");

        String email = null;
        String jwtToken = null;

        // Extract token if it exists in the header
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwtToken = authorizationHeader.substring(7);
            try {
                // Extract username from token
                email = jwtUtil.extractUsername(jwtToken);
                if (email != null && !jwtUtil.isTokenExpired(jwtToken)) {
                    // Validate token signature using nimbus-jose-jwt
                    if (validateToken(jwtToken)) {
                        if (SecurityContextHolder.getContext().getAuthentication() == null) {
                            // Authenticate user
                            Optional<User> userOptional = userService.findByEmail(email);
                            if (userOptional.isPresent()) {
                                User user = userOptional.get();

                                // Set security context
                                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                                        user, null, null // Fetch roles or authorities if needed
                                );
                                SecurityContextHolder.getContext().setAuthentication(authToken);
                            }
                        }
                    }
                }
            } catch (Exception e) {
                logger.warn("Invalid JWT token: {}");
            }
        }

        chain.doFilter(request, response);
    }

    /**
     * Validate token using Nimbus signature logic.
     */
    private boolean validateToken(String jwtToken) {
        try {
            SignedJWT signedJWT = SignedJWT.parse(jwtToken);

            // Use MACVerifier for signature validation with the secret key
            JWSVerifier verifier = new MACVerifier(jwtUtil.getSecretKeyBytes());
            return signedJWT.verify(verifier);
        } catch (Exception e) {
            logger.warn("Error validating token", e);
        }
        return false;
    }
}
