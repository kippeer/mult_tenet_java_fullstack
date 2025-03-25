package com.example.multitenant.service;

import com.example.multitenant.model.User;
import com.example.multitenant.repository.UserRepository;
import com.example.multitenant.security.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public ResponseEntity<?> login(LoginRequest request) {
        // Implementation
        return null;
    }

    public ResponseEntity<?> register(RegisterRequest request) {
        // Implementation
        return null;
    }
}