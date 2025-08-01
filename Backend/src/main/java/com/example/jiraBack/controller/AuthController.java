package com.example.jiraBack.controller;

import com.example.jiraBack.dto.*;
import com.example.jiraBack.security.jwt.JwtService;
import com.example.jiraBack.service.AuthService;
import io.jsonwebtoken.JwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.naming.AuthenticationException;
import java.time.Duration;


@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

// Все переписать желаетельно

    @PostMapping("/login")
    public ResponseEntity<JwtAuthenticationDto> login(@RequestBody AuthDto authDto) throws AuthenticationException {
        JwtAuthenticationDto tokens = authService.login(authDto);
        ResponseCookie refreshCookie = ResponseCookie.from("refreshToken", tokens.getRefreshToken())
                .httpOnly(true)
                .secure(false) // только для dev!
                .sameSite("Lax")
                .path("/")
                .maxAge(Duration.ofDays(7))
                .build();
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, refreshCookie.toString())
                .body(tokens);
    }
    // тож в сервис
    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(@CookieValue(value = "refreshToken", required = false) RefreshTokenDto refreshToken) {
        if (refreshToken == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No refresh token");
        }
        try {
            JwtAuthenticationDto dto = authService.refreshToken(refreshToken);
            return ResponseEntity.ok(dto);
        } catch (JwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired refresh token");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal error: " + e.getMessage());
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        ResponseCookie deleteCookie  = ResponseCookie.from("refreshToken", "")
                .httpOnly(true)
                .maxAge(0)
                .secure(false)
                .path("/")
                .sameSite("Lax")
                .build();
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, deleteCookie.toString())
                .body("Вы вышли из системы");
    }



}
// login
//        User user = userRepository.findByEmail(authDto.getEmail())
//                .orElseThrow(() -> new RuntimeException("Пользователь не найден"));
//
//        if (!passwordEncoder.matches(user.getPassword(), authDto.getPassword())) {
//            return ResponseEntity.badRequest().body("Неверный пароль");
//        }
//
//        JwtAuthenticationDto token = jwtService.generateAuthToken(user.getEmail());
//        return ResponseEntity.ok(token);
