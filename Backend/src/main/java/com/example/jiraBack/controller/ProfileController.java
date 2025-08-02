package com.example.jiraBack.controller;


import com.example.jiraBack.dto.UserDto;
import com.example.jiraBack.dto.UserProfileDto;
import com.example.jiraBack.entity.UserProfile;
import com.example.jiraBack.security.CustomUserDetails;
import com.example.jiraBack.security.jwt.JwtService;
import com.example.jiraBack.service.UserProfileService;
import com.example.jiraBack.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/profile")
@RequiredArgsConstructor
public class ProfileController {
    private final UserProfileService userProfileService;

    // Получение профиля текущего пользователя
    @GetMapping("/me")
    public ResponseEntity<UserProfileDto> getProfile(Authentication authentication) {
        Long userId = ((CustomUserDetails) authentication.getPrincipal()).id();
        UserProfileDto profile = userProfileService.getUserProfileByUserId(userId);
        if (profile == null) {
            return ResponseEntity.status(404).build();
        }
        return ResponseEntity.ok(profile);
    }

    // Обновление профиля
    @PutMapping("/me")
    public ResponseEntity<Void> updateProfile(@RequestBody UserProfileDto dto, Authentication authentication) {
        Long userId = ((CustomUserDetails) authentication.getPrincipal()).id();
        userProfileService.updateUserProfile(userId, dto);
        return ResponseEntity.ok().build();
    }
}

