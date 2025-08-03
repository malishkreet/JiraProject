package com.example.jiraBack.service.impl;

import com.example.jiraBack.dto.UserProfileDto;
import com.example.jiraBack.entity.User;
import com.example.jiraBack.entity.UserProfile;
import com.example.jiraBack.mapper.UserProfileMapper;
import com.example.jiraBack.repository.UserRepository;
import com.example.jiraBack.service.UserProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class UserProfileServiceImpl implements UserProfileService {
    private final UserRepository userRepository;
    private final UserProfileMapper userProfileMapper;

    @Override
    @Transactional
    public void updateUserProfile(Long userId, UserProfileDto userProfileDto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Not Found"));
        UserProfile userProfile = user.getUserProfile();
        if (userProfile == null) {
            userProfile = new UserProfile();
            userProfile.setUser(user);
        }
        userProfileMapper.updateUserProfile(userProfileDto, userProfile);

        if (userProfileDto.getFirstName() != null) {
            user.setFirstName(userProfileDto.getFirstName());
        }

        userRepository.save(user);



    }

    @Override
    public UserProfileDto getUserProfileByUserId(Long userId) {
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Not Found"));
        UserProfile profile = user.getUserProfile();

        return userProfileMapper.toDto(profile);
    }
}
