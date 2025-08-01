package com.example.jiraBack.service;

import com.example.jiraBack.dto.AuthDto;
import com.example.jiraBack.dto.JwtAuthenticationDto;
import com.example.jiraBack.dto.RefreshTokenDto;
import com.example.jiraBack.dto.RegisterDto;

import javax.naming.AuthenticationException;

public interface AuthService {
    JwtAuthenticationDto login(AuthDto authDto) throws AuthenticationException;
    JwtAuthenticationDto refreshToken(RefreshTokenDto refreshToken) throws Exception;
}
