package com.example.backend.Auth.security;

import com.nimbusds.jose.JWSVerifier;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.SignedJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.backend.Auth.service.UserService;
import com.example.backend.Auth.model.User;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;
import java.util.Collection;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        String jwtToken = null;

        // Extract JWT from cookies
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if ("jwt".equals(cookie.getName())) {
                    jwtToken = cookie.getValue();
                    break;
                }
            }
        }

        if (jwtToken != null) {
            try {
                // Extract email and userId from the token
                String email = jwtUtil.extractUsername(jwtToken);
                String userId = jwtUtil.extractUserId(jwtToken);
                String userRole = jwtUtil.getRoleFromToken(jwtToken); 
               

                // Validate token and check expiration
                if (email != null && userId != null && !jwtUtil.isTokenExpired(jwtToken)) {
                    // Validate signature
                    if (jwtUtil.validateToken(jwtToken)) {
                        // Authenticate user if not already authenticated
                        if (SecurityContextHolder.getContext().getAuthentication() == null) {
                            // You can optionally fetch user details from the database
                            Optional<User> userOptional = userService.findByEmail(email);

                            if (userOptional.isPresent()) {
                                User user = userOptional.get();

                                // Create authorities with role prefix
                                Collection<GrantedAuthority> authorities = AuthorityUtils.createAuthorityList(userRole);
                                

                                // Create a UsernamePasswordAuthenticationToken with userId as the principal
                                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                                        userId, // Store userId as the principal
                                        null,   // No credentials
                                        authorities // Set authorities
                                );

                                // Set authentication in security context
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


}
