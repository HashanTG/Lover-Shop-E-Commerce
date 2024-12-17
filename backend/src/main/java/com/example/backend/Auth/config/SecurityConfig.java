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

@Configuration
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Autowired
    private JwtUtil jwtUtil;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // Disable CSRF for stateless APIs
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**", "/login", "/static/**", "/oauth2/**").permitAll() // Public endpoints
                .anyRequest().authenticated()
            )
            // Form login configuration
            .formLogin(form -> form
                .loginPage("/login") // Serve static login.html
                .defaultSuccessUrl("/home", true) // Redirect to /home after login
                .permitAll()
            )
            // OAuth2 login configuration
            .oauth2Login(oauth2 -> oauth2
                .loginPage("/login") // Shared login page
                .successHandler((request, response, authentication) -> {
                    // Extract user details from authentication
                    OAuth2User oauthUser = (OAuth2User) authentication.getPrincipal();
                    String email = oauthUser.getAttribute("email");

                    // Generate JWT
                    String jwt = jwtUtil.generateToken(email, "USER");

                    // Return JWT in response
                    response.setContentType("application/json");
                    response.getWriter().write("{\"token\": \"" + jwt + "\"}");
                })
            )
            // Add JWT filter
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
