package com.example.backend.Auth.service;

import com.example.backend.Auth.model.User;
import com.example.backend.Auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Authenticate a user by email and raw password.
     * @param email the email of the user
     * @param rawPassword the raw password to validate
     * @return an Optional containing the authenticated user, or empty if authentication fails
     */
    public Optional<User> authenticateUser(String email, String rawPassword) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent() && passwordEncoder.matches(rawPassword, user.get().getPassword())) {
            return user;
        }
        return Optional.empty();
    }

    /**
     * Register a new user.
     * @param user the user to register
     * @return true if the registration is successful, false if the email already exists
     */
    public boolean registerUser(User user) {
        // Check if the email is already in use
        if (userRepository.existsByEmail(user.getEmail())) {
            return false; // Email already exists
        }

        // Hash the password before saving the user
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Save the new user to the database
        userRepository.save(user);
        return true;
    }

    /**
     * Find a user by email.
     * @param email the email of the user
     * @return an Optional containing the user, or empty if the user is not found
     */
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    
}
