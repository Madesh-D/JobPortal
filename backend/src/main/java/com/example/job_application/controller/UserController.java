package com.example.job_application.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.job_application.dto.LoginRequest;
import com.example.job_application.dto.LoginResponse;
import com.example.job_application.entity.User;
import com.example.job_application.service.UserService;

import jakarta.validation.Valid;

@CrossOrigin(origins = {
    "http://localhost:5173",
    "https://job-portal-rho-jade.vercel.app"
})
@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Register user
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user) {

        User savedUser = userService.registerUser(user);

        if (savedUser == null) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Email already registered");
        }

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedUser);
    }

    // Test backend
    @GetMapping("/test")
    public String test() {
        return "Backend is working!";
    }

    // Login user
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(
            @RequestBody LoginRequest request) {

        User user = userService.loginUser(
                request.getEmail(),
                request.getPassword()
        );

        if (user != null) {

            LoginResponse response = new LoginResponse(
                    user.getId(),
                    user.getName(),
                    user.getEmail(),
                    user.getRole()
            );

            return ResponseEntity.ok(response);
        }

        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body("Invalid email or password");
    }
}