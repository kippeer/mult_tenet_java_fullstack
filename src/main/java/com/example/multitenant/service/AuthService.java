package com.example.multitenant.service;

import com.example.multitenant.dto.AuthResponse;
import com.example.multitenant.dto.LoginRequest;
import com.example.multitenant.dto.RegisterRequest;
import com.example.multitenant.model.Company;
import com.example.multitenant.model.User;
import com.example.multitenant.repository.CompanyRepository;
import com.example.multitenant.repository.UserRepository;
import com.example.multitenant.security.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

    private final UserRepository userRepository;
    private final CompanyRepository companyRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository, CompanyRepository companyRepository,
                       PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.companyRepository = companyRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @Transactional
    public ResponseEntity<?> register(RegisterRequest request) {
        logger.info("Tentando registrar novo usuário: {}", request.getEmail());

        // Verifica se o email já está registrado
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            logger.warn("Registro falhou: Email já cadastrado - {}", request.getEmail());
            return ResponseEntity.badRequest().body("Email already registered");
        }

        // Criação e salvamento da empresa
        Company company = new Company();
        company.setName(request.getCompanyName());
        company = companyRepository.save(company);
        logger.info("Nova empresa criada: {}", company.getName());

        // Criação e configuração do usuário
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setCompany(company);

        // Salvando o usuário no banco de dados
        userRepository.save(user);
        logger.info("Novo usuário registrado: {}", user.getEmail());

        // Gerando o token após o registro
        String token = jwtUtil.generateToken(user.getEmail());

        // Retornando o token junto com uma mensagem de sucesso
        return ResponseEntity.ok(new AuthResponse(token, user.getEmail()));
    }

    public ResponseEntity<?> login(LoginRequest request) {
        logger.info("Tentativa de login para o email: {}", request.getEmail());

        return userRepository.findByEmail(request.getEmail())
                .filter(user -> {
                    boolean senhaValida = passwordEncoder.matches(request.getPassword(), user.getPassword());
                    if (!senhaValida) {
                        logger.warn("Falha no login: Senha inválida para {}", request.getEmail());
                    }
                    return senhaValida;
                })
                .map(user -> {
                    String token = jwtUtil.generateToken(user.getEmail());
                    logger.info("Login bem-sucedido para {} - Token gerado", user.getEmail());
                    return ResponseEntity.ok(new AuthResponse(token, user.getEmail()));
                })
                .orElseThrow(() -> {
                    logger.error("Falha no login: Credenciais inválidas para {}", request.getEmail());
                    return new BadCredentialsException("Invalid email or password");
                });
    }
}
