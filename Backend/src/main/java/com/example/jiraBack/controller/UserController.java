package com.example.jiraBack.controller;

import com.example.jiraBack.dto.UserDto;
import com.example.jiraBack.security.jwt.JwtService;
import com.example.jiraBack.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// на Postman тестить

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final JwtService jwtService;

// в сервис перекинуть ошибки
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        if (authHeader == null || authHeader.length() < 8) {
            return ResponseEntity.status(401).body("Missing or invalid Authorization header");
        }
        try {
            String token = authHeader.substring(7);
            String email = jwtService.getEmailFromToken(token);
            UserDto dto = userService.getUserByEmail(email);
            if (dto == null) {
                return ResponseEntity.status(404).body("User not found");
            }
            return ResponseEntity.ok(dto);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Internal server error: " + e.getMessage());
        }
    }

}
