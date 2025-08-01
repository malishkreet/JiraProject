package com.example.jiraBack.service.impl;


import com.example.jiraBack.dto.*;
import com.example.jiraBack.entity.User;
import com.example.jiraBack.mapper.UserMapper;
import com.example.jiraBack.repository.UserRepository;
import com.example.jiraBack.security.jwt.JwtService;
import com.example.jiraBack.service.RegisterService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.naming.AuthenticationException;
import java.util.Optional;


@RequiredArgsConstructor
@Service
public class RegisterServiceImpl implements RegisterService {
    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    // Регистрация
    @Override
    public String addUser(RegisterDto registerDto) {
        if (userRepository.findByEmail(registerDto.getEmail()).isPresent()) {
            throw new RuntimeException("Пользователь с таким email уже существует");
        }
        User user = new User();
        user.setEmail(registerDto.getEmail());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
        user.setFirstName(registerDto.getFirstName());
        userRepository.save(user);
        return "Пользователь успешно зарегистрирован";
    }


}
