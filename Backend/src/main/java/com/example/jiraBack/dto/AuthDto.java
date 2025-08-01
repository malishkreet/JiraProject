package com.example.jiraBack.dto;


import lombok.Data;

// Авторизация
@Data
public class AuthDto {
    private String email;
    private String password;
}
