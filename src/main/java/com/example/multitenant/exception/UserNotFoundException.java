package com.example.multitenant.exception;

public class UserNotFoundException extends RuntimeException {
    // Construtor que recebe a mensagem de erro
    public UserNotFoundException(String message) {
        super(message);  // Passa a mensagem para a superclasse (RuntimeException)
    }
}
