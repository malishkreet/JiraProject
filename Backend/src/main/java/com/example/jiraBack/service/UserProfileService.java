package com.example.jiraBack.service;

import com.example.jiraBack.dto.UserDto;
import com.example.jiraBack.dto.UserProfileDto;
import com.example.jiraBack.entity.UserProfile;

import java.util.Optional;

public interface UserProfileService {
    void updateUserProfile(Long userId, UserProfileDto userProfileDto);

    UserProfileDto getUserProfileByUserId(Long userId);
}
