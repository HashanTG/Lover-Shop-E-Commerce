package com.example.backend.Auth.config;

import com.example.backend.Auth.security.JwtAuthenticationFilter;
import com.example.backend.Auth.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

@Configuration
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Autowired
    private JwtUtil jwtUtil;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Disable CSRF for stateless APIs
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**", "/oauth2/**").permitAll() // Public endpoints
                .requestMatchers("/api/**").authenticated() // Protected endpoints
                .requestMatchers("/admin/**").hasRole("ADMIN") // Admin routes
                .requestMatchers("/user/**").hasAnyRole("USER", "ADMIN") // User routes
            )
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class) // Add custom JWT filter
            .oauth2Login(oauth2 -> oauth2
                .successHandler((request, response, authentication) -> {
                    try {
                        OAuth2User oauthUser = (OAuth2User) authentication.getPrincipal();
                        String email = oauthUser.getAttribute("email");
                        
                        // Generate JWT with user email as subject
                        String jwt = jwtUtil.generateToken("s",email, "USER");

                        // Create a secure, HttpOnly cookie to store the JWT
                        Cookie jwtCookie = new Cookie("jwt", jwt);
                        jwtCookie.setHttpOnly(true); // Prevent JavaScript access
                        jwtCookie.setSecure(true); // Only send over HTTPS in production
                        jwtCookie.setPath("/"); // Available across the application
                        jwtCookie.setMaxAge(60 * 60); // 1 hour expiration

                        // Add the cookie to the response
                        response.addCookie(jwtCookie);

                        // Redirect to the frontend
                        response.sendRedirect("http://localhost:5173");
                    } catch (Exception e) {
                        response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Token Generation Failed");
                    }
                })
            );

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
