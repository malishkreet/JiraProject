package com.example.jiraBack.dto;


import lombok.Data;

// регистрация

@Data
public class RegisterDto {
    private String firstName;
    private String email;
    private String password;
}
