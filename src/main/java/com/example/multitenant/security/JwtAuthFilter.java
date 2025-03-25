package com.example.multitenant.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    public JwtAuthFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        try {
            String token = extractToken(request);
            System.out.println("Token recebido: " + token); // 🔍 Log do token recebido

            if (token != null && jwtUtil.validateToken(token)) {
                Authentication auth = jwtUtil.getAuthentication(token);
                System.out.println("Autenticação obtida: " + auth); // 🔍 Log da autenticação

                SecurityContextHolder.getContext().setAuthentication(auth);
            }
        } catch (Exception e) {
            System.err.println("Erro no JwtAuthFilter: " + e.getMessage()); // 🔍 Log do erro
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Erro na autenticação: " + e.getMessage());
            return;
        }

        filterChain.doFilter(request, response);
    }
    private String extractToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        System.out.println("Authorization Header: " + bearerToken);

        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}