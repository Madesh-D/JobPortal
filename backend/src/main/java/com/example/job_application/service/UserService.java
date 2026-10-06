package com.example.job_application.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.job_application.entity.User;
import com.example.job_application.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder =
            new BCryptPasswordEncoder();

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Register user
    public User registerUser(User user) {

        if (userRepository.existsByEmail(user.getEmail())) {
            return null;
        }

        String encryptedPassword =
                passwordEncoder.encode(user.getPassword());

        user.setPassword(encryptedPassword);

        user.setRole("USER");
        
        return userRepository.save(user);
    }

    // Login user
    public User loginUser(String email, String password) {

        User user = userRepository.findByEmail(email).orElse(null);

        if (user != null &&
                passwordEncoder.matches(password, user.getPassword())) {

            return user;
        }

        return null;
    }
}