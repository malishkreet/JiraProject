package com.example.jiraBack.service.impl;

import com.example.jiraBack.dto.AuthDto;
import com.example.jiraBack.dto.JwtAuthenticationDto;
import com.example.jiraBack.dto.RefreshTokenDto;
import com.example.jiraBack.dto.RegisterDto;
import com.example.jiraBack.entity.User;
import com.example.jiraBack.repository.UserRepository;
import com.example.jiraBack.security.jwt.JwtService;
import com.example.jiraBack.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.naming.AuthenticationException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    @Override
    public JwtAuthenticationDto login(AuthDto authDto) throws AuthenticationException {
        User user = findByCredentials(authDto);

        return jwtService.generateAuthToken(user.getEmail());
    }

    @Override
    public JwtAuthenticationDto refreshToken(RefreshTokenDto refreshToken) throws Exception {
        String refreshTokenNow = refreshToken.getRefreshToken();
        if (refreshTokenNow != null && jwtService.validateJwtToken(refreshTokenNow)) {
            User user = findByEmail(jwtService.getEmailFromToken(refreshTokenNow));
            return jwtService.refreshBaseToken(user.getEmail(), refreshTokenNow);
        }
        throw new  AuthenticationException("Invalid refresh token");
    }


    private User findByCredentials (AuthDto authDto) throws AuthenticationException {
        Optional<User> optionalUser = userRepository.findByEmail(authDto.getEmail());
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (passwordEncoder.matches(authDto.getPassword(), user.getPassword())) {
                return user;
            }
        }
        throw new AuthenticationException("Wrong password");
    }

    private User findByEmail(String email) throws Exception {
        return userRepository.findByEmail(email).orElseThrow(
                () -> new Exception(String.format("User with email  not found", email))
        );
    }
}
