package com.example.backend.Auth.UtilSecurity;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityUtil {

    public static String getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // Check if authentication exists and is authenticated
        if (authentication != null && authentication.isAuthenticated()) {
            Object principal = authentication.getPrincipal();

            // Assuming principal is the user ID (String), adjust as needed
            if (principal instanceof String) {
                return (String) principal;
            }
        }

        // Return null or throw an exception if user ID is not available
        return null;
    }
}
