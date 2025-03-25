package com.example.multitenant.controller;

import com.example.multitenant.dto.LoginRequest;
import com.example.multitenant.dto.RegisterRequest;
import com.example.multitenant.service.AuthService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@Validated
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        logger.info("Recebendo solicitação de login para: {}", request.getEmail());
        ResponseEntity<?> response = authService.login(request);
        logger.info("Resposta do login: {}", response.getStatusCode());
        return response;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        logger.info("Recebendo solicitação de registro para: {}", request.getEmail());
        ResponseEntity<?> response = authService.register(request);
        logger.info("Resposta do registro: {}", response.getStatusCode());
        return response;
    }
}
