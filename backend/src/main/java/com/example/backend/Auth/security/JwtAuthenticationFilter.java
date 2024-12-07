package com.example.backend.Auth.security;

import io.jsonwebtoken.ExpiredJwtException;
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

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwtToken = authorizationHeader.substring(7);
            try {
                email = jwtUtil.extractUsername(jwtToken);
            } catch (ExpiredJwtException e) {
                logger.warn("JWT token is expired: {}");
            } catch (Exception e) {
                logger.warn("Invalid JWT token: {}");
            }
        }


    // Validate the email and set security context
    if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
        // Fetch user details without requiring password authentication
        Optional<User> userOptional = userService.findByEmail(email); // Create this method in UserService
        if (userOptional.isPresent()) {
            User user = userOptional.get();

            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                    user, null,null// Fetch authorities if needed
            );

            SecurityContextHolder.getContext().setAuthentication(authToken);
        }
    }

        chain.doFilter(request, response);
    }
}
